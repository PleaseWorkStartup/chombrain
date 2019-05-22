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
var RouteRenderer = (function (_super) {
    __extends(RouteRenderer, _super);
    function RouteRenderer(table) {
        var _this = _super.call(this, path.join(process.cwd(), "../../routes/Chombrain/" + table.name + ".php")) || this;
        _this.table = table;
        return _this;
    }
    RouteRenderer.prototype.getRenderStr = function () {
        var res = "<?php\nRoute::group(['as' => '" + this.table.name_raw + ".api.', \n  'prefix' => 'api/" + this.table.name_raw + "', \n  'middleware' => " + JSON.stringify(this.table.middleware_api) + "], \n  function () {\n\n  //Base action\n  Route::get('/', '" + this.table.name + "Controller@list')->name('list');\n  Route::post('/create', '" + this.table.name + "Controller@create')->name('create');\n  Route::get('/{row}', '" + this.table.name + "Controller@get')->name('get');\n  Route::post('/{row}/update', '" + this.table.name + "Controller@update')->name('update');\n  Route::post('/{row}/delete', '" + this.table.name + "Controller@delete')->name('delete');\n\n  " + _.map(this.table.cols, function (x) { return x.render("Route"); }).join("\n\n") + "\n\n  " + _.map(this.table.childRelations, function (x) { return x.renderChild("Route"); }).join("\n\n") + "\n\n  " + _.map(this.table.parentRelations, function (x) { return x.renderParent("Route"); }).join("\n\n") + "\n\n});\n\nRoute::group(['as' => '" + this.table.name_raw + ".views.', \n  'prefix' => '" + this.table.name_raw + "', \n  'middleware' => " + JSON.stringify(this.table.middleware_view) + "], \n  function () {\n\n  //Base action\n  Route::get('/', '" + this.table.name + "Controller@view_list')->name('list');\n  Route::get('/create', '" + this.table.name + "Controller@view_create')->name('create');\n  Route::get('/{row}/update',  '" + this.table.name + "Controller@view_update')->name('update');\n\n  " + _.map(this.table.cols, function (x) { return x.render("RouteView"); }).join("\n\n") + "\n\n  " + _.map(this.table.childRelations, function (x) { return x.renderChild("RouteView"); }).join("\n\n") + "\n\n  " + _.map(this.table.parentRelations, function (x) { return x.renderParent("RouteView"); }).join("\n\n") + "\n\n});\n";
        return res;
    };
    ;
    RouteRenderer.prototype.renderParts = function () {
    };
    ;
    return RouteRenderer;
}(Renderer_1.default));
exports.default = RouteRenderer;
//# sourceMappingURL=RouteRenderer.js.map