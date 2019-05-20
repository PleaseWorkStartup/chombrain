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
var path = require("path");
var MigrationRelationRenderer = (function (_super) {
    __extends(MigrationRelationRenderer, _super);
    function MigrationRelationRenderer(table) {
        var _this = this;
        var d = new Date();
        var d_str = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "_" + (Date.now() % 300000 + 600000);
        _this = _super.call(this, path.join(process.cwd(), "../database/migrations/" + d_str + "_relation_" + table.name_raw.replace("___", "_xxxx_").replace("__", "_xxx_") + "_table.php")) || this;
        _this.table = table;
        return _this;
    }
    MigrationRelationRenderer.prototype.getRenderStr = function () {
        var res = "<?php\n\nuse Illuminate\\Support\\Facades\\Schema;\nuse Illuminate\\Database\\Schema\\Blueprint;\nuse Illuminate\\Database\\Migrations\\Migration;\n\nclass Relation" + this.table.name.replace("__", "Xxxx").replace("_", "Xxx") + "Table extends Migration\n{\n  /**\n   * Run the migrations.\n   *\n   * @return void\n   */\n  public function up()\n  {\n    Schema::table('" + this.table.name_raw + "', function (Blueprint $table) {\n      " + _.map(this.table.childRelations, function (x) { return x.renderChild("Migration"); }).join("\n\n") + "\n      " + _.map(this.table.parentRelations, function (x) { return x.renderParent("Migration"); }).join("\n\n") + "\n    });\n  }\n\n  /**\n   * Reverse the migrations.\n   *\n   * @return void\n   */\n  public function down()\n  {\n    Schema::table('" + this.table.name_raw + "', function (Blueprint $table) {\n      " + _.map(this.table.childRelations, function (x) { return x.renderChild("MigrationDown"); }).join("\n\n") + "\n      " + _.map(this.table.parentRelations, function (x) { return x.renderParent("MigrationDown"); }).join("\n\n") + "\n    });\n  }\n\n}\n";
        return res;
    };
    ;
    MigrationRelationRenderer.prototype.renderParts = function () {
    };
    ;
    return MigrationRelationRenderer;
}(Renderer_1.default));
exports.default = MigrationRelationRenderer;
//# sourceMappingURL=MigrationRelationRenderer.js.map