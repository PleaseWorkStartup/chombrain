"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var column_1 = require("./column");
var _ = require("lodash");
var manytomany_1 = require("./manytomany");
var onetomany_1 = require("./onetomany");
var Table = (function () {
    function Table(table_name, migration) {
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
    Table.prototype.column = function (col_name, type_name) {
        if (type_name === void 0) { type_name = ""; }
        var type_args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            type_args[_i - 2] = arguments[_i];
        }
        var col = this.findColumn(col_name);
        if (type_name) {
            col.type.apply(col, [type_name].concat(type_args));
        }
        return col;
    };
    Object.defineProperty(Table.prototype, "name", {
        get: function () {
            function capitalizeFirstLetter(str) {
                return str[0].toUpperCase() + str.slice(1);
            }
            return capitalizeFirstLetter(this.name_raw.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "view_name", {
        get: function () {
            function capitalizeFirstLetter(str) {
                return str[0].toUpperCase() + str.slice(1);
            }
            return capitalizeFirstLetter(this.view_name_raw.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "is_view", {
        get: function () {
            return (this.name != this.nonview_table.name && this.crud_only);
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.noAuth = function (forapi, forview) {
        if (forapi === void 0) { forapi = true; }
        if (forview === void 0) { forview = true; }
        if (forapi && this.middleware_api.indexOf("auth") != -1)
            this.middleware_api.splice(this.middleware_api.indexOf("auth"), 1);
        if (forview && this.middleware_view.indexOf("auth") != -1)
            this.middleware_view.splice(this.middleware_view.indexOf("auth"), 1);
    };
    Table.prototype.middleware = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.middleware_api = this.middleware_api.concat(args);
        this.middleware_view = this.middleware_view.concat(args);
    };
    Table.prototype.attachView = function (name) {
        this.view_name_raw = name;
        var view_view = this.migration.findView(this.view_name_raw);
        this.view_table = this.migration.findTable(this.view_name_raw);
        this.view_table.nonview_table = this;
    };
    Table.prototype.addExView = function (name) {
        var view_view = this.migration.findView(name);
        this.ex_views.push(view_view);
        view_view.nonview_table = this;
    };
    Table.prototype.index = function (name) {
        this.extra_index.push(name);
    };
    Table.prototype.findColumn = function (name) {
        var res = _.find(this.columns, { name: name });
        if (res) {
            return res;
        }
        var t = new column_1.default(name, this, this.migration);
        this.columns.push(t);
        return t;
    };
    Object.defineProperty(Table.prototype, "cols", {
        get: function () {
            return _.filter(this.columns, "create_new");
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.multilinkMany = function (col_name, targets) {
        var col_type = col_name + "_type";
        var col_id = col_name + "_id";
        this.findColumn(col_type).index();
        this.findColumn(col_id).index();
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target = targets_1[_i];
            var r = new onetomany_1.default();
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
    };
    Table.prototype.alreadyLinkTo = function (table) {
        for (var _i = 0, _a = this.cols; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.getLinkTo()[0] == table)
                return col;
        }
        return null;
    };
    Table.prototype.hasOne = function (table_name) {
        if (this.crud_only)
            return;
        var linkToTable = this.migration.findTable(table_name);
        var linkToCol = linkToTable.alreadyLinkTo(this);
        if (linkToCol) {
            linkToCol.oneToOne();
        }
        else {
            var currLinkTo = this.findColumn(table_name + "_id").getLinkTo();
            if (currLinkTo && currLinkTo[0] == linkToTable)
                return;
            this.column(table_name + "_id").linkTo(table_name).insist_create_new = false;
        }
    };
    Table.prototype.hasMany = function (table_name) {
        if (this.crud_only)
            return;
        var linkToTable = this.migration.findTable(table_name);
        var linkToCol = linkToTable.alreadyLinkTo(this);
        if (linkToCol) {
            return;
        }
        var linkFromThis = this.alreadyLinkTo(linkToTable);
        if (linkFromThis) {
            linkFromThis.linkTo(null);
            var relation = new manytomany_1.default();
            var pivot_table_name = (table_name < this.name_raw ? table_name + "__" + this.name_raw : this.name_raw + "__" + table_name);
            var pivot_table = this.migration.findTable(pivot_table_name);
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
    };
    return Table;
}());
exports.default = Table;
//# sourceMappingURL=table.js.map