import Table from './table';
import ModelRenderer from '../renderer/ModelRenderer';
import ControllerRenderer from '../renderer/ControllerRenderer';
import RouteRenderer from '../renderer/RouteRenderer';
import * as _ from 'lodash'
import ManyToMany from './manytomany';
import OneToMany from './onetomany';
import OneToOne from './onetoone';
import Column from './column';
import Relation from './relation';
import MigrationRenderer from '../renderer/MigrationRenderer';
import * as fs from 'fs-extra';
import * as path from 'path';
import MigrationRelationRenderer from '../renderer/MigrationRelationRenderer';
import View from './view';
import ViewMigrationRenderer from './../renderer/ViewMigrationRenderer';
import ModelEventObserverRenderer from './../renderer/ModelEventObserverRenderer';
import ModelEventObserverRegisterRenderer from './../renderer/ModelEventObserverRegisterRenderer';
import RepositoryRenderer from './../renderer/RepositoryRenderer';

class Migration {
  public tables: Table[] = [];
  public onetomany: OneToMany;
  public onttoone: OneToOne;
  public manytomany: ManyToMany;
  public relations: Relation[] = [];

  constructor() {
    this.table("users",function(T: Table) {
      //T.create_new = false;
      T.column("name").type("string");
      T.column("email").type("string").unique();
      T.column("email_verified_at").type("timestamp").nullable();
      T.column("password").type("string").hidden();

      T.column("remember_token").type("string").nullable().hidden();
      T.column("confirmed").type("boolean").generated("email_verified_at <> NULL");

      T.column("profile").type("json");
      T.column("settings").type("json");

      T.column("is_admin").type("boolean").default(false);
    })

    this.table("password_resets",function(T: Table) {
      T.column("email").type("string",191);
      T.column("token").type("string",191);
    })

    this.table("file_upload_db",function(T: Table) {
      T.column("url").type("string")
      T.column("filepath").type("string")
      T.column("type").type("string")
      T.column("extension").type("string")
      T.column("mime").type("string")
      T.column("original_name").type("string")
      T.column("size").type("int")
    });
  }

  public table(name: string,callback: (T: Table)=>void) {
    let t: Table = this.findTable(name)
    callback(t);
  }

  public crudapi(name: string,callback: (T: Table)=>void) {
    let t: Table = this.findTable(name)
    t.crud_only = true;
    callback(t);
  }

  public view(name: string,sql: string = "",callback: (T: Table)=>void) {
    let t: View = this.findView(name)
    if (!t) {
      console.error("View "+name+" already defined before as Table");
      return;
    }
    t.sql = sql;
    callback(t);
  }

  private uniqueRelations() {
    for(let table of this.tables) {
      table.parentRelations = _.uniqBy(table.parentRelations,'childName')
      table.childRelations = _.uniqBy(table.childRelations,'parentName')
    }
  }

  private resolveRelations() {
    for(let table of this.tables) {
      if (table.name_raw != table.view_name_raw) {
        table.view_table.autoload = table.view_table.autoload.concat(table.autoload);
      }
      for(let column of table.cols) {
        let r: Relation = column.toRelation()
        if (r) {
          this.relations.push(r);
        }
      }
    }
    for(let r of this.relations) {
      r.parentTable.parentRelations.push(r);
      r.childTable.childRelations.push(r);
      if (r.parentTable.name_raw != r.parentTable.view_name_raw) {
        r.parentTable.view_table.parentRelations.push(r);
      }
      if (r.childTable.name_raw != r.childTable.view_name_raw) {
        r.childTable.view_table.childRelations.push(r);
      }

      for(var v of r.parentTable.ex_views) {
        v.parentRelations.push(r);
      }
      for(var v of r.childTable.ex_views) {
        v.childRelations.push(r);
      }
      /*if(r.childTable.name_raw == "skills__test") {
        console.log("aaa");
        console.log(r.childTable.childRelations.length)
      }*/
    }
    this.uniqueRelations()
  }

  public render_process_1() {
    this.resolveRelations();

    fs.moveSync(path.join(process.cwd(),"../../database/migrations/"),path.join(process.cwd(),"../../database/migrations_"+(99999999999999-Date.now())+"/"))

    for(let table of this.tables) {
      if (!table.create_new) continue;
      //console.log(table)
      let modelrenderer = new ModelRenderer(table)
      modelrenderer.render()
      let repositoryrenderer = new RepositoryRenderer(table);
      repositoryrenderer.render();
      let controllerrenderer = new ControllerRenderer(table)
      controllerrenderer.render()
      let routerenderer = new RouteRenderer(table)
      routerenderer.render()

      let modeleventobserverrenderer = new ModelEventObserverRenderer(table)
      modeleventobserverrenderer.render()
      let modeleventobserverregsiterrenderer = new ModelEventObserverRegisterRenderer(this);
      modeleventobserverregsiterrenderer.render()

      if (!table.crud_only) {
        let migrationrenderer = new MigrationRenderer(table)
        migrationrenderer.render()
      } else {
        if (table instanceof View) {
          //console.log(table);
          let viewmigrationrenderer = new ViewMigrationRenderer(table)
          viewmigrationrenderer.render();
        }
      }
    }
  }

  public render_process_2() {

    for(let table of this.tables) {
      console.log(table.name)
      if (!table.crud_only) {
        let migrationrelationrenderer = new MigrationRelationRenderer(table)
        migrationrelationrenderer.render()
      }
    }
  }

  public render() {
    //console.log(process.argv)
    if (process.argv.length==2) {
      this.render_simple();
    } else {
      if (process.argv[2]=="dev") {
        this.render_dev();
      } else if (process.argv[2]=="simple") {
        this.render_simple();
      } else {
        this.render_simple();
      }
    }
  }

  public render_simple() {
    this.render_process_1();
    this.render_process_2();
  }

  public render_dev() {
    //this.resolveRelations();

    let env = require('dotenv').config({ path: path.resolve(__dirname,'../..','.env') }).parsed
    const { exec } = require('child_process');
    //console.log(env);

    var mysql = require('mysql');
    let hasMigrationTable = false;

    var con = mysql.createConnection({
      host: env["DB_HOST"],
      port: env["DB_PORT"],
      user: env["DB_USERNAME"],
      password: env["DB_PASSWORD"],
      database: env["DB_DATABASE"]
    });

    function do_mysql_dump(cb: ()=>void) {
      exec(`mysqldump --host ${env["DB_HOST"]} --port ${env["DB_PORT"]} --user ${env["DB_USERNAME"]} ${env["DB_PASSWORD"].trim().length>0?'--password '+env["DB_PASSWORD"]:''} --databases ${env["DB_DATABASE"]} --result-file=${path.resolve(__dirname,'../mysqldump',Date.now()+'.sql')}`, (err:any, stdout:any, stderr:any) => {
        //console.log(`mysqldump --host ${env["DB_HOST"]} --port ${env["DB_PORT"]} --user ${env["DB_USERNAME"]} ${env["DB_PASSWORD"].length>0?'--password '+env["DB_PASSWORD"]:''} --databases ${env["DB_DATABASE"]} --result-file=${path.resolve(__dirname,'../mysqldump',Date.now()+'.sql')}`)
        if (err) {
          console.log("Mysql dump failed !!!!!!! Too danger to continue")
          console.log(stdout);
          console.log(stderr);
          process.exit(1);
          return;
        }
        console.log("Mysql dump success");
        console.log(stdout);
        console.log(stderr)
        console.log("================================================================")
        cb();
      });
    }

    function backup_old_data(cb: (x: any) => void) {
      //console.log(env.DB_USERNAME)

      let data: any = {};

      con.connect(function(err: any) {
        if (err) throw err;

        con.query("show tables", function (err: any, tables_raw: any) {
          if (err) throw err;
          
          let tables = [];
          let perform_count = 0;

          for(var table of tables_raw) {
            var name = table["Tables_in_"+env["DB_DATABASE"]];
            if (name!="migrations") {
              tables.push(name)
            } else {
              hasMigrationTable = true;
            }
          }

          if (tables.length==0) {
            con.end(function(err: any) {
              if (err) throw err;
            });
            cb(data)
          }

          for(let table of tables) {
            con.query("select * from "+table, function (err: any, rows: any) {
              data[table] = rows;
              perform_count++;
              if (perform_count == tables.length) {
                con.end(function(err: any) {
                  if (err) throw err;
                });
                cb(data)
              } 
            });
          }

        });
      });
    }

    function migrate_down(cb: ()=>void) {
      exec('php '+path.resolve(__dirname,'../..','artisan')+' migrate:rollback', (err:any, stdout:any, stderr:any) => {
        if (err) {
          console.log("Cannot migrate down");
          console.log(stdout);
          console.log(stderr);
          process.exit(1);
          return;
        }
      
        // the *entire* stdout and stderr (buffered)
        console.log("Migrate down\n")
        console.log("STDOUT")
        console.log(`${stdout}`);
        console.log("\nSTDERR")
        console.log(`${stderr}`);
        console.log("\n====================================================================================\n")

        cb();
      });
    }

    function do_restore_single(table:String,cb:(err:any)=>void) {
      
    }

    function main() {
      this.render_process_1();
      this.render_process_2();

      //Migrate UP
      exec('php '+path.resolve(__dirname,'../..','artisan')+' migrate', (err:any, stdout:any, stderr:any) => {
        if (err) {
          console.log("Cannot migrate up");
          console.log(stdout);
          console.log(stderr);
          process.exit(1);
          return;
        }
      
        // the *entire* stdout and stderr (buffered)
        console.log("Migrate Up\n")
        console.log("STDOUT")
        console.log(`${stdout}`);
        console.log("\nSTDERR")
        console.log(`${stderr}`);
        console.log("\n====================================================================================\n")

        con.connect(function(err: any) {
          if (err) throw err;

          //this.render_process_2();

        });


      });
    }

    do_mysql_dump(()=> {
      backup_old_data((old_data: any)=>{
        if (hasMigrationTable) {
          migrate_down(main);
        } else {
          main();
        }
      });
    });
    



    //console.log(this.relations.length);
    

  }

  public renderModelsUse() {
    return this.tables.map((x)=>"use App\\Models\\Chombrain\\"+x.name+";").join("\n");
  }

  public renderRepositoriesUse() {
    return this.tables.map((x)=>"use App\\Repositories\\Chombrain\\"+x.name+"Repository;").join("\n");
  }

  public findTable(name: string): Table {
    let res = _.find(this.tables,{name_raw: name});
    if (res) {
      return res;
    }
    let t = new Table(name, this)
    this.tables.push(t)
    return t
  }

  public findView(name: string): View {
    let res = _.find(this.tables,{name_raw: name});
    if (res) {
      if (res instanceof View) {
        return res;
      } else {
        return null;
      }
    }
    let t = new View(name, this)
    this.tables.push(t)
    return t
  }
}

export default Migration;