"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var RendererUtil = (function () {
    function RendererUtil(table) {
        this.table = table;
    }
    RendererUtil.prototype.cols_fillables = function () {
        return _.map(_.filter(this.table.cols, '_fillable'), 'name');
    };
    RendererUtil.prototype.cols_hidden = function () {
        return _.map(_.filter(this.table.cols, '_hidden'), 'name');
    };
    RendererUtil.prototype.cols_name = function () {
        return _.map(this.table.cols, "name");
    };
    RendererUtil.prototype.jsoncols = function () {
        return _.map(_.filter(this.table.cols, function (x) { return x._type.native_type == "json"; }), "name");
    };
    RendererUtil.prototype.jsoncasts = function () {
        return _.map(this.jsoncols(), function (name) { return "'" + name + "' => 'array'"; });
    };
    RendererUtil.prototype.jsonattributes = function () {
        return _.map(this.jsoncols(), function (name) { return "'" + name + "' => '[]'"; });
    };
    RendererUtil.prototype.cols_with = function () {
        return this.table.autoload;
    };
    RendererUtil.prototype.cols_with_count = function () {
        return this.table.autocount;
    };
    RendererUtil.prototype.renderParentRelations = function () {
        var res = "";
        for (var _i = 0, _a = this.table.parentRelations; _i < _a.length; _i++) {
            var r = _a[_i];
            res += r.renderParent("Model");
            res += "\n";
        }
        return res;
    };
    RendererUtil.prototype.renderChildRelations = function () {
        var res = "";
        for (var _i = 0, _a = this.table.childRelations; _i < _a.length; _i++) {
            var r = _a[_i];
            res += r.renderChild("Model");
            res += "\n";
        }
        return res;
    };
    return RendererUtil;
}());
exports.default = RendererUtil;
//# sourceMappingURL=RendererUtil.js.map