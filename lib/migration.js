"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var table_1 = require("./table");
var ModelRenderer_1 = require("../renderer/ModelRenderer");
var ControllerRenderer_1 = require("../renderer/ControllerRenderer");
var RouteRenderer_1 = require("../renderer/RouteRenderer");
var _ = require("lodash");
var MigrationRenderer_1 = require("../renderer/MigrationRenderer");
var fs = require("fs-extra");
var path = require("path");
var MigrationRelationRenderer_1 = require("../renderer/MigrationRelationRenderer");
var view_1 = require("./view");
var ViewMigrationRenderer_1 = require("./../renderer/ViewMigrationRenderer");
var ModelEventObserverRenderer_1 = require("./../renderer/ModelEventObserverRenderer");
var ModelEventObserverRegisterRenderer_1 = require("./../renderer/ModelEventObserverRegisterRenderer");
var RepositoryRenderer_1 = require("./../renderer/RepositoryRenderer");
var Migration = (function () {
    function Migration() {
        this.tables = [];
        this.relations = [];
        this.table("users", function (T) {
            T.column("name").type("string");
            T.column("email").type("string").unique();
            T.column("email_verified_at").type("timestamp").nullable();
            T.column("password").type("string").hidden();
            T.column("remember_token").type("string").nullable().hidden();
            T.column("confirmed").type("boolean").generated("email_verified_at <> NULL");
            T.column("profile").type("json");
            T.column("settings").type("json");
            T.column("is_admin").type("boolean").default(false);
        });
        this.table("password_resets", function (T) {
            T.column("email").type("string", 191);
            T.column("token").type("string", 191);
        });
        this.table("file_upload_db", function (T) {
            T.column("url").type("string");
            T.column("filepath").type("string");
            T.column("type").type("string");
            T.column("extension").type("string");
            T.column("mime").type("string");
            T.column("original_name").type("string");
            T.column("size").type("int");
        });
    }
    Migration.prototype.table = function (name, callback) {
        var t = this.findTable(name);
        callback(t);
    };
    Migration.prototype.crudapi = function (name, callback) {
        var t = this.findTable(name);
        t.crud_only = true;
        callback(t);
    };
    Migration.prototype.view = function (name, sql, callback) {
        if (sql === void 0) { sql = ""; }
        var t = this.findView(name);
        if (!t) {
            console.error("View " + name + " already defined before as Table");
            return;
        }
        t.sql = sql;
        callback(t);
    };
    Migration.prototype.uniqueRelations = function () {
        for (var _i = 0, _a = this.tables; _i < _a.length; _i++) {
            var table = _a[_i];
            table.parentRelations = _.uniqBy(table.parentRelations, 'childName');
            table.childRelations = _.uniqBy(table.childRelations, 'parentName');
        }
    };
    Migration.prototype.resolveRelations = function () {
        for (var _i = 0, _a = this.tables; _i < _a.length; _i++) {
            var table = _a[_i];
            if (table.name_raw != table.view_name_raw) {
                table.view_table.autoload = table.view_table.autoload.concat(table.autoload);
            }
            for (var _b = 0, _c = table.cols; _b < _c.length; _b++) {
                var column = _c[_b];
                var r = column.toRelation();
                if (r) {
                    this.relations.push(r);
                }
            }
        }
        for (var _d = 0, _e = this.relations; _d < _e.length; _d++) {
            var r = _e[_d];
            r.parentTable.parentRelations.push(r);
            r.childTable.childRelations.push(r);
            if (r.parentTable.name_raw != r.parentTable.view_name_raw) {
                r.parentTable.view_table.parentRelations.push(r);
            }
            if (r.childTable.name_raw != r.childTable.view_name_raw) {
                r.childTable.view_table.childRelations.push(r);
            }
            for (var _f = 0, _g = r.parentTable.ex_views; _f < _g.length; _f++) {
                var v = _g[_f];
                v.parentRelations.push(r);
            }
            for (var _h = 0, _j = r.childTable.ex_views; _h < _j.length; _h++) {
                var v = _j[_h];
                v.childRelations.push(r);
            }
        }
        this.uniqueRelations();
    };
    Migration.prototype.render_process_1 = function () {
        this.resolveRelations();
        fs.moveSync(path.join(process.cwd(), "../../database/migrations/"), path.join(process.cwd(), "../../database/migrations_" + (99999999999999 - Date.now()) + "/"));
        for (var _i = 0, _a = this.tables; _i < _a.length; _i++) {
            var table = _a[_i];
            if (!table.create_new)
                continue;
            var modelrenderer = new ModelRenderer_1.default(table);
            modelrenderer.render();
            var repositoryrenderer = new RepositoryRenderer_1.default(table);
            repositoryrenderer.render();
            var controllerrenderer = new ControllerRenderer_1.default(table);
            controllerrenderer.render();
            var routerenderer = new RouteRenderer_1.default(table);
            routerenderer.render();
            var modeleventobserverrenderer = new ModelEventObserverRenderer_1.default(table);
            modeleventobserverrenderer.render();
            var modeleventobserverregsiterrenderer = new ModelEventObserverRegisterRenderer_1.default(this);
            modeleventobserverregsiterrenderer.render();
            if (!table.crud_only) {
                var migrationrenderer = new MigrationRenderer_1.default(table);
                migrationrenderer.render();
            }
            else {
                if (table instanceof view_1.default) {
                    var viewmigrationrenderer = new ViewMigrationRenderer_1.default(table);
                    viewmigrationrenderer.render();
                }
            }
        }
    };
    Migration.prototype.render_process_2 = function () {
        for (var _i = 0, _a = this.tables; _i < _a.length; _i++) {
            var table = _a[_i];
            console.log(table.name);
            if (!table.crud_only) {
                var migrationrelationrenderer = new MigrationRelationRenderer_1.default(table);
                migrationrelationrenderer.render();
            }
        }
    };
    Migration.prototype.render = function () {
        if (process.argv.length == 2) {
            this.render_simple();
        }
        else {
            if (process.argv[2] == "dev") {
                this.render_dev();
            }
            else if (process.argv[2] == "simple") {
                this.render_simple();
            }
            else {
                this.render_simple();
            }
        }
    };
    Migration.prototype.render_simple = function () {
        this.render_process_1();
        this.render_process_2();
    };
    Migration.prototype.render_dev = function () {
        var env = require('dotenv').config({ path: path.resolve(__dirname, '../..', '.env') }).parsed;
        var exec = require('child_process').exec;
        var mysql = require('mysql');
        var hasMigrationTable = false;
        var con = mysql.createConnection({
            host: env["DB_HOST"],
            port: env["DB_PORT"],
            user: env["DB_USERNAME"],
            password: env["DB_PASSWORD"],
            database: env["DB_DATABASE"]
        });
        function do_mysql_dump(cb) {
            exec("mysqldump --host " + env["DB_HOST"] + " --port " + env["DB_PORT"] + " --user " + env["DB_USERNAME"] + " " + (env["DB_PASSWORD"].trim().length > 0 ? '--password ' + env["DB_PASSWORD"] : '') + " --databases " + env["DB_DATABASE"] + " --result-file=" + path.resolve(__dirname, '../mysqldump', Date.now() + '.sql'), function (err, stdout, stderr) {
                if (err) {
                    console.log("Mysql dump failed !!!!!!! Too danger to continue");
                    console.log(stdout);
                    console.log(stderr);
                    process.exit(1);
                    return;
                }
                console.log("Mysql dump success");
                console.log(stdout);
                console.log(stderr);
                console.log("================================================================");
                cb();
            });
        }
        function backup_old_data(cb) {
            var data = {};
            con.connect(function (err) {
                if (err)
                    throw err;
                con.query("show tables", function (err, tables_raw) {
                    if (err)
                        throw err;
                    var tables = [];
                    var perform_count = 0;
                    for (var _i = 0, tables_raw_1 = tables_raw; _i < tables_raw_1.length; _i++) {
                        var table = tables_raw_1[_i];
                        var name = table["Tables_in_" + env["DB_DATABASE"]];
                        if (name != "migrations") {
                            tables.push(name);
                        }
                        else {
                            hasMigrationTable = true;
                        }
                    }
                    if (tables.length == 0) {
                        con.end(function (err) {
                            if (err)
                                throw err;
                        });
                        cb(data);
                    }
                    var _loop_1 = function (table_2) {
                        con.query("select * from " + table_2, function (err, rows) {
                            data[table_2] = rows;
                            perform_count++;
                            if (perform_count == tables.length) {
                                con.end(function (err) {
                                    if (err)
                                        throw err;
                                });
                                cb(data);
                            }
                        });
                    };
                    for (var _a = 0, tables_1 = tables; _a < tables_1.length; _a++) {
                        var table_2 = tables_1[_a];
                        _loop_1(table_2);
                    }
                });
            });
        }
        function migrate_down(cb) {
            exec('php ' + path.resolve(__dirname, '../..', 'artisan') + ' migrate:rollback', function (err, stdout, stderr) {
                if (err) {
                    console.log("Cannot migrate down");
                    console.log(stdout);
                    console.log(stderr);
                    process.exit(1);
                    return;
                }
                console.log("Migrate down\n");
                console.log("STDOUT");
                console.log("" + stdout);
                console.log("\nSTDERR");
                console.log("" + stderr);
                console.log("\n====================================================================================\n");
                cb();
            });
        }
        function do_restore_single(table, cb) {
        }
        function main() {
            this.render_process_1();
            this.render_process_2();
            exec('php ' + path.resolve(__dirname, '../..', 'artisan') + ' migrate', function (err, stdout, stderr) {
                if (err) {
                    console.log("Cannot migrate up");
                    console.log(stdout);
                    console.log(stderr);
                    process.exit(1);
                    return;
                }
                console.log("Migrate Up\n");
                console.log("STDOUT");
                console.log("" + stdout);
                console.log("\nSTDERR");
                console.log("" + stderr);
                console.log("\n====================================================================================\n");
                con.connect(function (err) {
                    if (err)
                        throw err;
                });
            });
        }
        do_mysql_dump(function () {
            backup_old_data(function (old_data) {
                if (hasMigrationTable) {
                    migrate_down(main);
                }
                else {
                    main();
                }
            });
        });
    };
    Migration.prototype.renderModelsUse = function () {
        return this.tables.map(function (x) { return "use App\\Models\\Chombrain\\" + x.name + ";"; }).join("\n");
    };
    Migration.prototype.renderRepositoriesUse = function () {
        return this.tables.map(function (x) { return "use App\\Repositories\\Chombrain\\" + x.name + "Repository;"; }).join("\n");
    };
    Migration.prototype.findTable = function (name) {
        var res = _.find(this.tables, { name_raw: name });
        if (res) {
            return res;
        }
        var t = new table_1.default(name, this);
        this.tables.push(t);
        return t;
    };
    Migration.prototype.findView = function (name) {
        var res = _.find(this.tables, { name_raw: name });
        if (res) {
            if (res instanceof view_1.default) {
                return res;
            }
            else {
                return null;
            }
        }
        var t = new view_1.default(name, this);
        this.tables.push(t);
        return t;
    };
    return Migration;
}());
exports.default = Migration;
//# sourceMappingURL=migration.js.map