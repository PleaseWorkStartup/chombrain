import * as _ from 'lodash';
class RendererUtil {
    constructor(table) {
        this.table = table;
    }
    cols_fillables() {
        return _.map(_.filter(this.table.cols, '_fillable'), 'name');
    }
    cols_hidden() {
        return _.map(_.filter(this.table.cols, '_hidden'), 'name');
    }
    cols_name() {
        return _.map(this.table.cols, "name");
    }
    jsoncols() {
        return _.map(_.filter(this.table.cols, (x) => x._type.native_type == "json"), "name");
    }
    jsoncasts() {
        return _.map(this.jsoncols(), (name) => `'${name}' => 'array'`);
    }
    jsonattributes() {
        return _.map(this.jsoncols(), (name) => `'${name}' => '[]'`);
    }
    cols_with() {
        return this.table.autoload;
    }
    cols_with_count() {
        return this.table.autocount;
    }
    renderParentRelations() {
        let res = "";
        for (let r of this.table.parentRelations) {
            res += r.renderParent("Model");
            res += "\n";
        }
        return res;
    }
    renderChildRelations() {
        let res = "";
        for (let r of this.table.childRelations) {
            res += r.renderChild("Model");
            res += "\n";
        }
        return res;
    }
}
export default RendererUtil;
//# sourceMappingURL=RendererUtil.js.map