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
var _ = require("lodash");
var MigrationRenderer = (function (_super) {
    __extends(MigrationRenderer, _super);
    function MigrationRenderer(table) {
        var _this = this;
        var d = new Date();
        var d_str = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "_" + (Date.now() % 300000 + 100000);
        _this = _super.call(this, "../../database/migrations/" + d_str + "_create_" + table.name_raw.replace("___", "_xxxx_").replace("__", "_xxx_") + "_table.php") || this;
        _this.table = table;
        return _this;
    }
    MigrationRenderer.prototype.getRenderStr = function () {
        var res = "<?php\n\nuse Illuminate\\Support\\Facades\\Schema;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Database\\Migrations\\Migration;\n\nclass Create" + this.table.name.replace("__", "Xxxx").replace("_", "Xxx") + "Table extends Migration\n{\n  /**\n   * Run the migrations.\n   *\n   * @return void\n   */\n  public function up()\n  {\n    Schema::create('" + this.table.name_raw + "', function (Blueprint $table) {\n      $table->increments('id');\n      " + _.map(this.table.cols, function (col) { return col.render("Migration"); }).join("\n") + "\n      $table->timestamps();\n    });\n  }\n\n  /**\n   * Reverse the migrations.\n   *\n   * @return void\n   */\n  public function down()\n  {\n    Schema::dropIfExists('" + this.table.name_raw + "');\n  }\n\n}\n";
        return res;
    };
    ;
    MigrationRenderer.prototype.renderParts = function () {
    };
    ;
    return MigrationRenderer;
}(Renderer_1.default));
exports.default = MigrationRenderer;
//# sourceMappingURL=MigrationRenderer.1.js.map