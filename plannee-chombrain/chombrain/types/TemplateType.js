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
var TemplateType = (function (_super) {
    __extends(TemplateType, _super);
    function TemplateType() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.native_type = "string";
        _this.native_args = [];
        return _this;
    }
    TemplateType.prototype.renderMigration = function () {
        var res = _super.prototype.renderMigration.call(this);
        res += "";
        return res;
    };
    TemplateType.prototype.renderRouteAPI = function () {
        var res = _super.prototype.renderRouteAPI.call(this);
        res += "";
        if (this.col._hidden) {
            res = '';
        }
        return res;
    };
    TemplateType.prototype.renderRouteView = function () {
        var res = _super.prototype.renderRouteView.call(this);
        res += "";
        if (this.col._hidden) {
            res = '';
        }
        return res;
    };
    TemplateType.prototype.renderController = function () {
        var res = _super.prototype.renderController.call(this);
        res += "";
        if (this.col._hidden) {
            res = '';
        }
        return res;
    };
    TemplateType.prototype.afterConstruct = function () {
    };
    return TemplateType;
}(BaseType_1.default));
exports.default = TemplateType;
//# sourceMappingURL=TemplateType.js.map