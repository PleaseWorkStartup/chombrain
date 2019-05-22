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
var Renderer_1 = require("./Renderer");
var ModelEventObserverRenderer = (function (_super) {
    __extends(ModelEventObserverRenderer, _super);
    function ModelEventObserverRenderer(table) {
        var _this = _super.call(this, "../../app/Models/Chombrain/" + table.name + "/" + table.name + "EventObserver.php") || this;
        _this.table = table;
        return _this;
    }
    ModelEventObserverRenderer.prototype.getRenderStr = function () {
        var res = "<?php\nnamespace App\\Models\\Chombrain\\" + this.table.name + ";\n\nuse App\\Models\\Chombrain\\" + this.table.name + ";\n\nclass " + this.table.name + "EventObserver\n{\n  /**\n   * Handle the " + this.table.name + " \"creating\" event.\n   *\n   * @param  \\App\\Models\\Chombrain\\" + this.table.name + "  $row\n   * @return void\n   */\n  public function creating(" + this.table.name + " $row)\n  {\n    $req = request();\n    $row->beforeCreate($req,$row);\n  }\n\n  /**\n   * Handle the " + this.table.name + " \"created\" event.\n   *\n   * @param  \\App\\Models\\Chombrain\\" + this.table.name + "  $row\n   * @return void\n   */\n  public function created(" + this.table.name + " $row)\n  {\n    $row->afterCreate($row);\n  }\n\n  /**\n   * Handle the " + this.table.name + " \"updating\" event.\n   *\n   * @param  \\App\\Models\\Chombrain\\" + this.table.name + "  $row\n   * @return void\n   */\n  public function updating(" + this.table.name + " $row)\n  {\n    $req = request();\n    $row->beforeUpdate($req,$row);\n  }\n\n  /**\n   * Handle the " + this.table.name + " \"updated\" event.\n   *\n   * @param  \\App\\Models\\Chombrain\\" + this.table.name + "  $row\n   * @return void\n   */\n  public function updated(" + this.table.name + " $row)\n  {\n    $row->afterUpdate($row);\n  }\n\n  /**\n   * Handle the " + this.table.name + " \"deleting\" event.\n   *\n   * @param  \\App\\Models\\Chombrain\\" + this.table.name + "  $row\n   * @return void\n   */\n  public function deleting(" + this.table.name + " $row)\n  {\n    $row->beforeDelete($row);\n  }\n\n  /**\n   * Handle the " + this.table.name + " \"deleted\" event.\n   *\n   * @param  \\App\\Models\\Chombrain\\" + this.table.name + "  $row\n   * @return void\n   */\n  public function deleted(" + this.table.name + " $row)\n  {\n    $row->afterDelete($row->id);\n  }\n}\n";
        return res;
    };
    ;
    ModelEventObserverRenderer.prototype.renderParts = function () {
    };
    ;
    return ModelEventObserverRenderer;
}(Renderer_1.default));
exports.default = ModelEventObserverRenderer;
//# sourceMappingURL=ModelEventObserverRenderer.1.js.map