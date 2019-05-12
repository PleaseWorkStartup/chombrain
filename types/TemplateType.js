import BaseType from './BaseType';
export default class TemplateType extends BaseType {
    constructor(...args) {
        super(...args);
        this.native_type = "string";
        this.native_args = [];
    }
    renderMigration() {
        let res = super.renderMigration();
        res += ``;
        return res;
    }
    renderRouteAPI() {
        let res = super.renderRouteAPI();
        res += ``;
        if (this.col._hidden) {
            res = '';
        }
        return res;
    }
    renderRouteView() {
        let res = super.renderRouteView();
        res += ``;
        if (this.col._hidden) {
            res = '';
        }
        return res;
    }
    renderController() {
        let res = super.renderController();
        res += ``;
        if (this.col._hidden) {
            res = '';
        }
        return res;
    }
    afterConstruct() {
    }
}
//# sourceMappingURL=TemplateType.js.map