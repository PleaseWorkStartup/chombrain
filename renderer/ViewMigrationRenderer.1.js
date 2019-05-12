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
var ViewMigrationRenderer = (function (_super) {
    __extends(ViewMigrationRenderer, _super);
    function ViewMigrationRenderer(view) {
        var _this = this;
        var d = new Date();
        var d_str = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "_" + (Date.now() % 300000 + 600000);
        _this = _super.call(this, "../../database/migrations/" + d_str + "_create_" + view.name_raw.replace("___", "_xxxx_").replace("__", "_xxx_") + "_view.php") || this;
        _this.view = view;
        return _this;
    }
    ViewMigrationRenderer.prototype.getRenderStr = function () {
        var res = "<?php\n\nuse Illuminate\\Support\\Facades\\Schema;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Database\\Migrations\\Migration;\n\nclass Create" + this.view.name.replace("__", "Xxxx").replace("_", "Xxx") + "View extends Migration\n{\n  /**\n   * Run the migrations.\n   *\n   * @return void\n   */\n  public function up()\n  {\n    DB::statement(\"CREATE VIEW " + this.view.name_raw + " AS " + this.view.sql.replace(/\"/g, '\\"') + "\");\n  }\n\n  /**\n   * Reverse the migrations.\n   *\n   * @return void\n   */\n  public function down()\n  {\n    DB::statement(\"DROP VIEW " + this.view.name_raw + "\");\n  }\n\n}\n";
        return res;
    };
    ;
    ViewMigrationRenderer.prototype.renderParts = function () {
    };
    ;
    return ViewMigrationRenderer;
}(Renderer_1.default));
exports.default = ViewMigrationRenderer;
//# sourceMappingURL=ViewMigrationRenderer.1.js.map