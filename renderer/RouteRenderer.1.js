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
var RouteRenderer = (function (_super) {
    __extends(RouteRenderer, _super);
    function RouteRenderer(table) {
        var _this = _super.call(this, "../../routes/ChomBrain/" + table.name + ".php") || this;
        _this.table = table;
        return _this;
    }
    RouteRenderer.prototype.getRenderStr = function () {
        var res = "<?php\nRoute::group(['as' => '" + this.table.name_raw + ".', 'prefix' => 'api/" + this.table.name_raw + "'], function () {\n\n  //Base action\n  Route::get('/', '" + this.table.name + "Controller@list')->name('list');\n  Route::post('/create', '" + this.table.name + "Controller@create')->name('create');\n  Route::get('/{row}', '" + this.table.name + "Controller@get')->name('get');\n  Route::post('/{row}/update', '" + this.table.name + "Controller@update')->name('update');\n  Route::post('/{row}/delete', '" + this.table.name + "Controller@delete')->name('delete');\n\n});\n";
        return res;
    };
    ;
    RouteRenderer.prototype.renderParts = function () {
    };
    ;
    return RouteRenderer;
}(Renderer_1.default));
exports.default = RouteRenderer;
//# sourceMappingURL=RouteRenderer.1.js.map