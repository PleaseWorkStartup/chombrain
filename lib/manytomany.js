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
var relation_1 = require("./relation");
var _ = require("lodash");
var ManyToMany = (function (_super) {
    __extends(ManyToMany, _super);
    function ManyToMany() {
        return _super.call(this) || this;
    }
    ManyToMany.prototype.renderChild = function (mode) {
        if (mode === void 0) { mode = "Model"; }
        if (mode == "Model")
            var res = "\n  public function " + this.parentName + "()\n  {\n    return $this->belongsToMany('App\\Models\\Chombrain\\" + this.parentTable.view_name + "','" + this.pivotTable.view_name + "','" + this.childColumn.name + "','" + this.parentColumn.name + "')\n            ->withPivot(" + JSON.stringify(_.map(this.pivotTable.view_table.cols, "name")) + ")\n            ->withTimestamps();\n  }\n";
        else if (mode == "Migration")
            var res = "\n        \n      ";
        return res;
    };
    ManyToMany.prototype.renderParent = function (mode) {
        if (mode === void 0) { mode = "Model"; }
        if (mode == "Model")
            var res = "\n  public function " + this.childName + "()\n  {\n    return $this->belongsToMany('App\\Models\\Chombrain\\" + this.childTable.view_name + "','" + this.pivotTable.view_name + "','" + this.parentColumn.name + "','" + this.childColumn.name + "')\n            ->withPivot(" + JSON.stringify(_.map(this.pivotTable.view_table.cols, "name")) + ")\n            ->withTimestamps();\n  }\n";
        else if (mode == "Migration")
            var res = "\n        \n      ";
        return res;
    };
    return ManyToMany;
}(relation_1.default));
exports.default = ManyToMany;
//# sourceMappingURL=manytomany.js.map