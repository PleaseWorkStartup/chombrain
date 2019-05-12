import Column from "./column";
import * as _ from 'lodash';
import ManyToMany from "./manytomany";
import OneToMany from './onetomany';
class Table {
    constructor(table_name, migration) {
        this.view_table = this;
        this.nonview_table = this;
        this.create_new = true;
        this.crud_only = false;
        this.columns = [];
        this.ex_views = [];
        this.autoload = [];
        this.autocount = [];
        this.parentRelations = [];
        this.childRelations = [];
        this.middleware_api = ['auth'];
        this.middleware_view = ['auth'];
        this.extra_index = [];
        this.name_raw = table_name;
        this.view_name_raw = this.name_raw;
        this.migration = migration;
        this.column("id").type("int").unique().notfillable().create_new = false;
    }
    column(col_name, type_name = "", ...type_args) {
        let col = this.findColumn(col_name);
        if (type_name) {
            col.type(type_name, ...type_args);
        }
        return col;
    }
    get name() {
        function capitalizeFirstLetter(str) {
            return str[0].toUpperCase() + str.slice(1);
        }
        return capitalizeFirstLetter(this.name_raw.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); }));
    }
    get view_name() {
        function capitalizeFirstLetter(str) {
            return str[0].toUpperCase() + str.slice(1);
        }
        return capitalizeFirstLetter(this.view_name_raw.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); }));
    }
    get is_view() {
        return (this.name != this.nonview_table.name && this.crud_only);
    }
    noAuth(forapi = true, forview = true) {
        if (forapi && this.middleware_api.indexOf("auth") != -1)
            this.middleware_api.splice(this.middleware_api.indexOf("auth"), 1);
        if (forview && this.middleware_view.indexOf("auth") != -1)
            this.middleware_view.splice(this.middleware_view.indexOf("auth"), 1);
    }
    middleware(...args) {
        this.middleware_api = this.middleware_api.concat(args);
        this.middleware_view = this.middleware_view.concat(args);
    }
    attachView(name) {
        this.view_name_raw = name;
        var view_view = this.migration.findView(this.view_name_raw);
        this.view_table = this.migration.findTable(this.view_name_raw);
        this.view_table.nonview_table = this;
    }
    addExView(name) {
        var view_view = this.migration.findView(name);
        this.ex_views.push(view_view);
        view_view.nonview_table = this;
    }
    index(name) {
        this.extra_index.push(name);
    }
    findColumn(name) {
        let res = _.find(this.columns, { name: name });
        if (res) {
            return res;
        }
        let t = new Column(name, this, this.migration);
        this.columns.push(t);
        return t;
    }
    get cols() {
        return _.filter(this.columns, "create_new");
    }
    multilinkMany(col_name, targets) {
        var col_type = col_name + "_type";
        var col_id = col_name + "_id";
        this.findColumn(col_type).index();
        this.findColumn(col_id).index();
        for (var target of targets) {
            let r = new OneToMany();
            r.parentTable = this.migration.findTable(target);
            r.parentColumn = r.parentTable.findColumn("id");
            r.parentName = r.parentTable.name_raw;
            r.childTable = this;
            r.childColumn = this.findColumn(col_id);
            r.childName = this.name_raw;
            r.isMorph = true;
            r.morphTypeColumn = this.findColumn(col_type);
            r.morphName = col_name;
            this.migration.relations.push(r);
        }
    }
    alreadyLinkTo(table) {
        for (let col of this.cols) {
            if (col.getLinkTo()[0] == table)
                return col;
        }
        return null;
    }
    hasOne(table_name) {
        if (this.crud_only)
            return;
        let linkToTable = this.migration.findTable(table_name);
        let linkToCol = linkToTable.alreadyLinkTo(this);
        if (linkToCol) {
            linkToCol.oneToOne();
        }
        else {
            let currLinkTo = this.findColumn(table_name + "_id").getLinkTo();
            if (currLinkTo && currLinkTo[0] == linkToTable)
                return;
            this.column(table_name + "_id").linkTo(table_name).insist_create_new = false;
        }
    }
    hasMany(table_name) {
        if (this.crud_only)
            return;
        let linkToTable = this.migration.findTable(table_name);
        let linkToCol = linkToTable.alreadyLinkTo(this);
        if (linkToCol) {
            return;
        }
        let linkFromThis = this.alreadyLinkTo(linkToTable);
        if (linkFromThis) {
            linkFromThis.linkTo(null);
            let relation = new ManyToMany();
            let pivot_table_name = (table_name < this.name_raw ? table_name + "__" + this.name_raw : this.name_raw + "__" + table_name);
            let pivot_table = this.migration.findTable(pivot_table_name);
            pivot_table.pivot_data = [this, linkToTable];
            relation.parentTable = this;
            relation.parentColumn = pivot_table.column(this.name_raw + "_id").linkTo(this.name_raw);
            relation.parentName = this.name_raw;
            relation.childTable = linkToTable;
            relation.childColumn = pivot_table.column(linkToTable.name_raw + "_id").linkTo(linkToTable.name_raw);
            relation.childName = linkToTable.name_raw;
            relation.pivotTable = pivot_table;
            this.migration.relations.push(relation);
            return;
        }
        linkToTable.column(this.name_raw + "_id").linkTo(this.name_raw).insist_create_new = false;
    }
}
export default Table;
//# sourceMappingURL=table.js.map