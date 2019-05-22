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
var path = require("path");
var ModelEventObserverRegisterRenderer = (function (_super) {
    __extends(ModelEventObserverRegisterRenderer, _super);
    function ModelEventObserverRegisterRenderer(migration) {
        var _this = _super.call(this, path.join(process.cwd(), "../../app/Chombrain/modelobserverregister.php")) || this;
        _this.migration = migration;
        return _this;
    }
    ModelEventObserverRegisterRenderer.prototype.getRenderStr = function () {
        var res = "<?php\n" + this.migration.renderModelsUse() + "\n" + this.migration.tables.map(function (x) { return "use App\\Models\\Chombrain\\" + x.name + "\\" + x.name + "EventObserver;"; }).join("\n") + "\n\nif (! function_exists('___registerModelObserver')) {\n  function ___registerModelObserver() {\n    " + this.migration.tables.map(function (table) { return "\n      " + (table.is_view ? table.name + "::observe(" + table.nonview_table.name + "EventObserver::class);" : table.name + "::observe(" + table.name + "EventObserver::class);") + "\n    "; }).join("") + "\n  }\n}\n";
        return res;
    };
    ;
    ModelEventObserverRegisterRenderer.prototype.renderParts = function () {
    };
    ;
    return ModelEventObserverRegisterRenderer;
}(Renderer_1.default));
exports.default = ModelEventObserverRegisterRenderer;
//# sourceMappingURL=ModelEventObserverRegisterRenderer.js.map