import OneToMany from "./onetomany";
import OneToOne from "./onetoone";
import NativeType from './../types/NativeType';
import ArrayType from './../types/ArrayType';
import DictType from './../types/DictType';
class Column {
    constructor(name, table, migration) {
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
    type(name, ...args) {
        this.type_raw = name;
        if (name == "int")
            this._type = new NativeType("integer", ...args);
        else if (name == "bool")
            this._type = new NativeType("boolean", ...args);
        else if (name == "image")
            this._type = new NativeType("string", ...args);
        else if (name == "file")
            this._type = new NativeType("string", ...args);
        else if (name == "array")
            this._type = new ArrayType(...args);
        else if (name == "dict")
            this._type = new DictType(...args);
        else
            this._type = new NativeType(name, ...args);
        this._type.col = this;
        this._type.table = this.table;
        return this;
    }
    after(name) {
        this._after = name;
        return this;
    }
    charset(name) {
        this._charset = name;
        return this;
    }
    collation(name) {
        this._collation = name;
        return this;
    }
    comment(name) {
        this._comment = name;
        return this;
    }
    first(val = true) {
        this._first = val;
        return this;
    }
    nullable(val = true) {
        this._nullable = val;
        return this;
    }
    unsigned(val = true) {
        this._unsigned = val;
        return this;
    }
    useCurrent(val = true) {
        this._useCurrent = val;
        return this;
    }
    hidden(val = true) {
        this._hidden = val;
        return this;
    }
    virtualAs(exp) {
        this._generated = exp;
        this._generated_stored = false;
        return this;
    }
    storedAs(exp) {
        this._generated = exp;
        this._generated_stored = true;
        return this;
    }
    generated(exp, stored = true) {
        this._generated = exp;
        this._generated_stored = stored;
        return this;
    }
    default(val) {
        this._default = val;
        return this;
    }
    fillable(val = true) {
        this._fillable = val;
        return this;
    }
    notfillable() {
        this._fillable = false;
        return this;
    }
    linkTo(table) {
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
    }
    oneToOne(val = true) {
        this._oneToOne = val;
        return this;
    }
    autolink(val = true) {
        this._autolink = val;
        return this;
    }
    autolinkCount(val = true) {
        this._autolink_count = val;
        return this;
    }
    unique(val = true) {
        this._unique = val;
        return this;
    }
    index(val = true) {
        this._index = val;
        return this;
    }
    toRelation_resolveParentName() {
        var id_pos = this.name.indexOf("_id", this.name.length - "_id".length);
        if (id_pos !== -1) {
            return this.name.substr(0, id_pos);
        }
        ;
        return this.name;
    }
    toRelation() {
        if (this._linkTo) {
            if (this._oneToOne) {
                let res = new OneToOne();
                res.childTable = this.table;
                res.childColumn = this;
                res.childName = this.table.name_raw;
                res.parentTable = this._linkTo;
                res.parentColumn = this._linkTo.findColumn("id");
                res.parentName = this.toRelation_resolveParentName();
                return res;
            }
            else {
                let res = new OneToMany();
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
    }
    getLinkTo() {
        return [this._linkTo, this._oneToOne];
    }
    getDefaultValue() {
        return this._default;
    }
    render(mode = "Migration") {
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
            var res = `->orWhere('${this.name}','LIKE','%'.escapeLike($simpleSearch).'%')`;
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
    }
    isNullable() {
        return this._nullable;
    }
}
export default Column;
//# sourceMappingURL=column.js.map