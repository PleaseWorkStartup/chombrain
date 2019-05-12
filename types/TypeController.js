"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeType_1 = require("./NativeType");
var types = {};
function register(name, type) {
    types[name] = type;
}
function getType(name) {
    if (types[name]) {
        return types[name];
    }
    else {
        return NativeType_1.default;
    }
}
exports.default = {
    types: types,
    register: register,
    getType: getType
};
//# sourceMappingURL=TypeController.js.map