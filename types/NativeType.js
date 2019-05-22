"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseType_1 = require("./BaseType");
var NativeType = (function (_super) {
    __extends(NativeType, _super);
    function NativeType(type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.native_type = type;
        _this.native_args = args;
        return _this;
    }
    NativeType.prototype.renderMigration = function () {
        var res = _super.prototype.renderMigration.call(this);
        res += "";
        return res;
    };
    NativeType.prototype.renderRouteAPI = function () {
        var res = _super.prototype.renderRouteAPI.call(this);
        res += "";
        if (this.col._hidden) {
            res = '';
        }
        return res;
    };
    NativeType.prototype.renderRouteView = function () {
        var res = _super.prototype.renderRouteView.call(this);
        res += "";
        if (this.col._hidden) {
            res = '';
        }
        return res;
    };
    NativeType.prototype.renderController = function () {
        var res = _super.prototype.renderController.call(this);
        res += "";
        if (this.col._hidden) {
            res = '';
        }
        return res;
    };
    NativeType.prototype.afterConstruct = function () {
    };
    return NativeType;
}(BaseType_1.default));
exports.default = NativeType;
//# sourceMappingURL=NativeType.js.map