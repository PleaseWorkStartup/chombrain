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
var Type_1 = require("./Type");
var BaseType = (function (_super) {
    __extends(BaseType, _super);
    function BaseType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseType.prototype.renderMigration = function () {
        var res = "";
        return res;
    };
    BaseType.prototype.renderRouteAPI = function () {
        var res = "\n    //Column " + this.col.name + "\n    Route::get('/{row}/col/" + this.col.name + "', '" + this.col.table.name + "Controller@singlecol_" + this.col.name + "')->name('singlecol_" + this.col.name + "_get');\n    ";
        return res;
    };
    BaseType.prototype.renderRouteView = function () {
        var res = "\n\n    ";
        return res;
    };
    BaseType.prototype.renderController = function () {
        var res = "\n    public function singlecol_" + this.col.name + "(Request $request, " + this.col.table.name + " $row) {\n      $row->onRead($row);\n      return response()->json($row->" + this.col.name + ");\n    }\n    ";
        return res;
    };
    BaseType.prototype.afterConstruct = function () {
    };
    return BaseType;
}(Type_1.default));
exports.default = BaseType;
//# sourceMappingURL=BaseType.js.map