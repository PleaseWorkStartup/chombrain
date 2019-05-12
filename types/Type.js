export default class Type {
    constructor(...args) {
        this.args = args;
    }
    get native_default() {
        return this.col.getDefaultValue();
    }
}
//# sourceMappingURL=Type.js.map