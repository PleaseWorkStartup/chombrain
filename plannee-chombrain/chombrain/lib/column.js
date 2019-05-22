"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onetomany_1 = require("./onetomany");
var onetoone_1 = require("./onetoone");
var NativeType_1 = require("./../types/NativeType");
var ArrayType_1 = require("./../types/ArrayType");
var DictType_1 = require("./../types/DictType");
var Column = (function () {
    function Column(name, table, migration) {
        this.create_new = true;
        this.insist_create_new = false;
        this.type_raw = "string";
        this._fillable = true;
        this._hidden = false;
        this._oneToOne = false;
        this._autolink = false;
        this._autolink_count = false;
        this._morphToRendered = false;
        this.name = name;
        this.migration = migration;
        this.table = table;
    }
    Column.prototype.type = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.type_raw = name;
        if (name == "int")
            this._type = new (NativeType_1.default.bind.apply(NativeType_1.default, [void 0, "integer"].concat(args)))();
        else if (name == "bool")
            this._type = new (NativeType_1.default.bind.apply(NativeType_1.default, [void 0, "boolean"].concat(args)))();
        else if (name == "image")
            this._type = new (NativeType_1.default.bind.apply(NativeType_1.default, [void 0, "string"].concat(args)))();
        else if (name == "file")
            this._type = new (NativeType_1.default.bind.apply(NativeType_1.default, [void 0, "string"].concat(args)))();
        else if (name == "array")
            this._type = new (ArrayType_1.default.bind.apply(ArrayType_1.default, [void 0].concat(args)))();
        else if (name == "dict")
            this._type = new (DictType_1.default.bind.apply(DictType_1.default, [void 0].concat(args)))();
        else
            this._type = new (NativeType_1.default.bind.apply(NativeType_1.default, [void 0, name].concat(args)))();
        this._type.col = this;
        this._type.table = this.table;
        return this;
    };
    Column.prototype.after = function (name) {
        this._after = name;
        return this;
    };
    Column.prototype.charset = function (name) {
        this._charset = name;
        return this;
    };
    Column.prototype.collation = function (name) {
        this._collation = name;
        return this;
    };
    Column.prototype.comment = function (name) {
        this._comment = name;
        return this;
    };
    Column.prototype.first = function (val) {
        if (val === void 0) { val = true; }
        this._first = val;
        return this;
    };
    Column.prototype.nullable = function (val) {
        if (val === void 0) { val = true; }
        this._nullable = val;
        return this;
    };
    Column.prototype.unsigned = function (val) {
        if (val === void 0) { val = true; }
        this._unsigned = val;
        return this;
    };
    Column.prototype.useCurrent = function (val) {
        if (val === void 0) { val = true; }
        this._useCurrent = val;
        return this;
    };
    Column.prototype.hidden = function (val) {
        if (val === void 0) { val = true; }
        this._hidden = val;
        return this;
    };
    Column.prototype.virtualAs = function (exp) {
        this._generated = exp;
        this._generated_stored = false;
        return this;
    };
    Column.prototype.storedAs = function (exp) {
        this._generated = exp;
        this._generated_stored = true;
        return this;
    };
    Column.prototype.generated = function (exp, stored) {
        if (stored === void 0) { stored = true; }
        this._generated = exp;
        this._generated_stored = stored;
        return this;
    };
    Column.prototype.default = function (val) {
        this._default = val;
        return this;
    };
    Column.prototype.fillable = function (val) {
        if (val === void 0) { val = true; }
        this._fillable = val;
        return this;
    };
    Column.prototype.notfillable = function () {
        this._fillable = false;
        return this;
    };
    Column.prototype.linkTo = function (table) {
        if (table == null) {
            this._linkTo = null;
            this._oneToOne = false;
            return this;
        }
        this._linkTo = this.migration.findTable(table);
        this.type("int").unsigned().index();
        this.create_new = true;
        this.insist_create_new = true;
        return this;
    };
    Column.prototype.oneToOne = function (val) {
        if (val === void 0) { val = true; }
        this._oneToOne = val;
        return this;
    };
    Column.prototype.autolink = function (val) {
        if (val === void 0) { val = true; }
        this._autolink = val;
        return this;
    };
    Column.prototype.autolinkCount = function (val) {
        if (val === void 0) { val = true; }
        this._autolink_count = val;
        return this;
    };
    Column.prototype.unique = function (val) {
        if (val === void 0) { val = true; }
        this._unique = val;
        return this;
    };
    Column.prototype.index = function (val) {
        if (val === void 0) { val = true; }
        this._index = val;
        return this;
    };
    Column.prototype.toRelation_resolveParentName = function () {
        var id_pos = this.name.indexOf("_id", this.name.length - "_id".length);
        if (id_pos !== -1) {
            return this.name.substr(0, id_pos);
        }
        ;
        return this.name;
    };
    Column.prototype.toRelation = function () {
        if (this._linkTo) {
            if (this._oneToOne) {
                var res = new onetoone_1.default();
                res.childTable = this.table;
                res.childColumn = this;
                res.childName = this.table.name_raw;
                res.parentTable = this._linkTo;
                res.parentColumn = this._linkTo.findColumn("id");
                res.parentName = this.toRelation_resolveParentName();
                return res;
            }
            else {
                var res = new onetomany_1.default();
                res.childTable = this.table;
                res.childColumn = this;
                res.childName = this.table.name_raw;
                res.parentTable = this._linkTo;
                res.parentColumn = this._linkTo.findColumn("id");
                res.parentName = this.toRelation_resolveParentName();
                return res;
            }
        }
        return null;
    };
    Column.prototype.getLinkTo = function () {
        return [this._linkTo, this._oneToOne];
    };
    Column.prototype.getDefaultValue = function () {
        return this._default;
    };
    Column.prototype.render = function (mode) {
        if (mode === void 0) { mode = "Migration"; }
        if (mode == "Migration") {
            if (this.table.crud_only)
                return "";
            var res = "$table->" + this._type.native_type + "('" + this.name + "'";
            if (this._type.native_args && this._type.native_args.length > 0) {
                res += ',';
                var typeargsstr = JSON.stringify(this._type.native_args);
                typeargsstr = typeargsstr.substr(1, typeargsstr.length - 2);
                res += typeargsstr;
            }
            res += ')';
            if (this._after)
                res += "->after('" + this._after + "')";
            if (this._charset)
                res += "->charset('" + this._charset + "')";
            if (this._collation)
                res += "->collation('" + this._collation + "')";
            if (this._comment)
                res += "->comment('" + this._comment.replace(/\'/g, "\\'") + "')";
            if (this._first)
                res += "->first()";
            if (this._nullable)
                res += "->nullable()";
            if (this._unsigned)
                res += "->unsigned()";
            if (this._useCurrent)
                res += "->useCurrent()";
            if (typeof this._type.native_default != "undefined")
                res += "->default(" + JSON.stringify(this._type.native_default) + ")";
            if (this._unique)
                res += "->unique()";
            if (this._index)
                res += "->index()";
            if (this._generated) {
                if (this._generated_stored)
                    res += "->storedAs('" + this._generated.replace("'", "\\'") + "')";
                else
                    res += "->virtualAs('" + this._generated.replace("'", "\\'") + "')";
            }
            res += ";";
            res += this._type.renderMigration();
        }
        else if (mode == "SimpleSearchEXP") {
            var res = "->orWhere('" + this.name + "','LIKE','%'.escapeLike($simpleSearch).'%')";
            if (this._hidden || this._type.native_type == "boolean")
                res = "";
        }
        else if (mode == "ControllerFunc") {
            var res = this._type.renderController();
        }
        else if (mode == "Route") {
            var res = this._type.renderRouteAPI();
        }
        else if (mode == "RouteView") {
            var res = this._type.renderRouteView();
        }
        return res;
    };
    Column.prototype.isNullable = function () {
        return this._nullable;
    };
    return Column;
}());
exports.default = Column;
//# sourceMappingURL=column.js.map