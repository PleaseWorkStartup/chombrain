"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Type = (function () {
    function Type() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.args = args;
    }
    Object.defineProperty(Type.prototype, "native_default", {
        get: function () {
            return this.col.getDefaultValue();
        },
        enumerable: true,
        configurable: true
    });
    return Type;
}());
exports.default = Type;
//# sourceMappingURL=Type.js.map