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
var RendererUtil_1 = require("./RendererUtil");
var path = require("path");
var ModelRenderer = (function (_super) {
    __extends(ModelRenderer, _super);
    function ModelRenderer(table) {
        var _this = _super.call(this, path.join(process.cwd(), "../app/Models/Chombrain/" + table.name + ".php")) || this;
        _this.table = table;
        _this.util = new RendererUtil_1.default(table);
        return _this;
    }
    ModelRenderer.prototype.getRenderStr = function () {
        var res = "<?php\nnamespace App\\Models\\Chombrain;\n\nuse Illuminate\\Database\\Eloquent\\Model;\nuse Illuminate\\Support\\Facades\\Auth;\nuse App\\Models\\" + this.table.nonview_table.name + "\\" + this.table.nonview_table.name + "Permission;\nuse App\\Models\\" + this.table.nonview_table.name + "\\" + this.table.nonview_table.name + "Autofill;\n" + (this.table.is_view ? "use App\\Models\\Chombrain\\" + this.table.nonview_table.name + ";" : "") + "\n" + (this.table.view_table.name != this.table.name ? "use App\\Models\\Chombrain\\" + this.table.view_table.name + ";" : "") + "\n" + (function () {
            return "";
        })() +
            ("\nclass " + this.table.name + " extends " + (this.table.is_view ? this.table.nonview_table.name : "Model") + " {\n\n  " + (!this.table.is_view ? "\n    use " + this.table.nonview_table.name + "Permission;\n    use " + this.table.nonview_table.name + "Autofill;\n" : "") + "\n\n  protected $table = '" + this.table.name_raw + "';\n\n  " + (this.table.findColumn("id").create_new ? "public $incrementing = false;" : "") + "\n\n  /**\n   * all columns of this table\n   * \n   */\n  public $allColumns = " + JSON.stringify(this.util.cols_name()) + ";\n  \n  /**\n   * The attributes that are mass assignable.\n   *\n   * @var array\n   */\n  protected $fillable = " + JSON.stringify(this.util.cols_fillables()) + ";\n\n  /**\n   * The attributes that should be hidden for arrays.\n   *\n   * @var array\n   */\n  protected $hidden = " + JSON.stringify(this.util.cols_hidden()) + ";\n\n  /**\n   * The attributes that should be cast to native types.\n   *\n   * @var array\n   */\n  protected $casts = [\n    " + this.util.jsoncasts().join(",\n") + "\n  ];\n\n  /**\n   * default value of each column (only if value of that column is null)\n   *\n   * @var array\n   */\n  protected $attributes = [\n    " + this.util.jsonattributes().join(",\n") + "\n  ];\n\n  /**\n   * The relations to eager load on every query.\n   *\n   * @var array\n   */\n  protected $with = " + JSON.stringify(this.util.cols_with()) + ";\n\n  /**\n   * The relationship counts that should be eager loaded on every query.\n   *\n   * @var array\n   */\n  protected $withCount = " + JSON.stringify(this.util.cols_with_count()) + ";\n\n  " + (false && !this.table.is_view ? "\n    public static function create(array $data = []) {\n      if (!" + this.table.name + "::canCreate($data)) {\n        throw new Exception(\"Permission denied\");\n        return;\n      }\n      $model = new " + this.table.name + ";\n      $model->fill($data);\n\n      $model->createAutofill($data, $model);\n\n      $model->save();\n      //$model->afterCreate($model);\n      return $model;\n    }\n  " : "") + "\n\n  public function nonview() {\n    return $this->hasOne('App\\Models\\Chombrain\\" + this.table.nonview_table.name + "',\"id\",\"id\");\n  }\n\n  public function view() {\n    return $this->hasOne('App\\Models\\Chombrain\\" + this.table.view_table.name + "',\"id\",\"id\");\n  }\n\n  public function refresh() {\n    return " + this.table.name + "::find($this->id);\n  }\n\n  " + this.util.renderParentRelations() + "\n\n  " + this.util.renderChildRelations() + "\n\n}\n");
        return res;
    };
    ModelRenderer.prototype.renderParts = function () {
        var PermissionPart = (function (_super) {
            __extends(PermissionPart, _super);
            function PermissionPart(table) {
                var _this = _super.call(this, "../../app/Models/" + table.name + "/" + table.name + "Permission.php", false) || this;
                _this.table = table;
                return _this;
            }
            PermissionPart.prototype.getRenderStr = function () {
                var res = "<?php\nnamespace App\\Models\\" + this.table.name + ";\n\nuse Illuminate\\Support\\Facades\\Auth;\nuse App\\Models\\Chombrain\\" + this.table.name + ";\n\ntrait " + this.table.name + "Permission {\n\n  public static function canCreate(array &$data) {\n    //if (Auth::user() && Auth::user()->is_admin) return true;\n    \n    return true;\n  }\n\n  public function canRead() {\n    //if (Auth::user() && Auth::user()->is_admin) return true;\n    \n    return true;\n  }\n\n  public function canUpdate(array &$data) {\n    //if (Auth::user() && Auth::user()->is_admin) return true;\n    \n    return true;\n  }\n\n  public function canDelete() {\n    //if (Auth::user() && Auth::user()->is_admin) return true;\n    \n    return true;\n  }\n\n  public static function filterRecordRules($query) {\n    return $query;\n  }\n\n}\n";
                return res;
            };
            PermissionPart.prototype.renderParts = function () {
            };
            return PermissionPart;
        }(Renderer_1.default));
        new PermissionPart(this.table).render();
        var AutofillPart = (function (_super) {
            __extends(AutofillPart, _super);
            function AutofillPart(table) {
                var _this = _super.call(this, "../../app/Models/" + table.name + "/" + table.name + "Autofill.php", false) || this;
                _this.table = table;
                return _this;
            }
            AutofillPart.prototype.getRenderStr = function () {
                var res = "<?php\nnamespace App\\Models\\" + this.table.name + ";\n\nuse Illuminate\\Support\\Facades\\Auth;\nuse App\\Models\\Chombrain\\" + this.table.name + ";\n\ntrait " + this.table.name + "Autofill {\n\n  public function onRead(" + this.table.name + " &$data) {\n\n  }\n\n  public static function beforeList() {\n\n  }\n\n  public static function afterList(&$data) {\n\n  }\n\n  public static function beforeCreate(array &$data) {\n    \n  }\n\n  public function createAutofill(array &$data, " + this.table.name + " &$currdata) {\n    \n  }\n\n  public function afterCreate(" + this.table.name + " &$data) {\n\n  }\n\n  public function beforeUpdate(array &$data, " + this.table.name + " &$olddata) {\n    \n  }\n\n  public function updateAutofill(array &$data, " + this.table.name + " &$currdata) {\n    \n  }\n\n  public function afterUpdate(" + this.table.name + " &$data) {\n\n  }\n\n  public function beforeDelete(" + this.table.name + " &$data) {\n    \n  }\n\n  public function afterDelete($id) {\n    \n  }\n\n}\n";
                return res;
            };
            AutofillPart.prototype.renderParts = function () {
            };
            return AutofillPart;
        }(Renderer_1.default));
        new AutofillPart(this.table).render();
    };
    return ModelRenderer;
}(Renderer_1.default));
exports.default = ModelRenderer;
//# sourceMappingURL=ModelRenderer.js.map