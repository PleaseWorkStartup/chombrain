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
var kebabCase = require('kebab-case');
var OneToMany = (function (_super) {
    __extends(OneToMany, _super);
    function OneToMany() {
        return _super.call(this) || this;
    }
    OneToMany.prototype.renderChild = function (mode) {
        if (mode === void 0) { mode = "Model"; }
        if (mode == "Model") {
            var res = "\n        public function " + this.parentName + (this.isMorph ? "___" : "") + "()\n        {\n          return $this->belongsTo('App\\Models\\Chombrain\\" + this.parentTable.view_name + "','" + this.childColumn.name + "');\n        }\n      ";
            if (this.isMorph) {
                res += "\n          public function get" + kebabCase.reverse("-" + this.parentName.replace(/_/, "-")) + "Attribute() {\n            if($this->" + this.morphTypeColumn.name + " == 'App\\Models\\Chombrain\\" + this.parentTable.view_name + "') return $this->" + this.parentName + "___;\n            return null;\n          }\n        ";
            }
            if (this.isMorph && !this.childColumn._morphToRendered)
                res += "\n        public function " + this.morphName + "() {\n          return $this->morphTo();\n        }\n      ";
            if (this.isMorph)
                this.childColumn._morphToRendered = true;
        }
        else if (mode == "Migration") {
            if (this.childTable.crud_only || this.parentTable.crud_only)
                return "";
            if (this.isMorph)
                return "";
            var res = "\n      $table->foreign('" + this.childColumn.name + "')\n            ->references('id')\n            ->on('" + this.parentTable.name_raw + "')\n            ->onDelete('" + (this.parentColumn.isNullable() ? 'set null' : this.onDelete) + "')\n            ->onUpdate('" + (this.parentColumn.isNullable() ? 'set null' : this.onDelete) + "');\n      \n      //$table->index('" + this.childColumn.name + "');\n            ";
        }
        else if (mode == "MigrationDown") {
            if (this.childTable.crud_only || this.parentTable.crud_only)
                return "";
            if (this.isMorph)
                return "";
            var res = "\n      $table->dropForeign(['" + this.childColumn.name + "']);\n            ";
        }
        else if (mode == "ControllerFunc")
            var res = "\n  public function relation_" + this.parentName + "(Request $request," + this.childTable.name + " $row) {\n    try {\n      $output = " + this.parentTable.name + "::filterRecordRules( $row->" + this.parentName + "() );\n\n      if (!$output) {\n        throw new \\Exception(\"Permission Denied\");\n      }\n\n      $output = $output->first();\n\n      return response()->json($output);\n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n          ";
        else if (mode == "Route")
            var res = "\n      Route::get('/{row}/" + this.parentTable.name_raw + "', '" + this.childTable.name + "Controller@relation_" + this.parentName + "')->name('" + this.parentTable.name_raw + "_get');\n      ";
        else if (mode == "RouteView") {
        }
        return res;
    };
    OneToMany.prototype.renderParent = function (mode) {
        if (mode === void 0) { mode = "Model"; }
        if (mode == "Model")
            var res = "\n  public function " + this.childName + "()\n  {\n    " + (!this.isMorph ? "\n      return $this->hasMany('App\\Models\\Chombrain\\" + this.childTable.view_name + "','" + this.childColumn.name + "');\n    " : "\n      return $this->view->morphMany('App\\Models\\Chombrain\\" + this.childTable.view_name + "', '" + this.parentName + "', '" + this.morphTypeColumn.name + "', '" + this.childColumn.name + "');\n    ") + "\n  }\n";
        else if (mode == "Migration")
            var res = "\n\n            ";
        else if (mode == "ControllerFunc")
            var res = "\n  public function relation_" + this.childName + "(Request $request," + this.parentTable.name + " $row) {\n    try {\n      " + this.childTable.name + "::beforeList();\n      $output = " + this.childTable.name + "::filterRecordRules( $row->" + this.childName + "() );\n\n      if (!$output) {\n        throw new \\Exception(\"Permission Denied\");\n      }\n\n      $output = $output->get();\n\n      " + this.childTable.name + "::afterList($output);\n\n      return response()->json($output);\n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n\n  public function relation_" + this.childName + "_create(Request $request," + this.parentTable.name + " $row) {\n    try {\n      $data = $request->all();\n      $data[\"" + this.childColumn.name + "\"] = $row->id;\n\n      $newrow = new " + this.childTable.name + ";\n\n      DB::transaction(function () use ($data, $row, $newrow) {\n        if (!" + this.childTable.name + "::canCreate($data)) {\n          throw new \\Exception(\"Permission denied\");\n          return;\n        }\n\n        " + this.childTable.name + "::beforeCreate($data);\n\n        $newrow->fill($data);\n        $newrow->createAutofill($data,$newrow);\n        $newrow->" + this.childColumn.name + " = $row->id;\n        $newrow->save();\n        $newrow->afterCreate($newrow);\n      });\n\n      return response()->json([\n        'status' => 'success',\n        'data' => $newrow\n      ]);\n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n\n  public function relation_" + this.childName + "_update(Request $request," + this.parentTable.name + " $row, " + this.childTable.name + " $childRow) {\n    try {\n      $data = $request->all();\n\n      DB::transaction(function () use ($data, $row, $childRow) {\n        if (!$childRow->canUpdate($data)) {\n          throw new Exception(\"Permission denied\");\n        }\n\n        $childRow->beforeUpdate($data, $row);\n\n        $childRow->fill($data);\n        $childRow->updateAutofill($data, $childRow);\n        $childRow->touch();\n        $childRow->save();\n\n        $childRow->afterUpdate($childRow);\n      });\n\n      return response()->json([\n        'id' => $childRow->id,\n        'status' => 'success',\n        'data' => $childRow\n      ]);\n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n\n  public function relation_" + this.childName + "_delete(Request $request," + this.parentTable.name + " $row, " + this.childTable.name + " $childRow) {\n    try {\n      DB::transaction(function () use ($row, $childRow) {\n        if (!$childRow->canDelete()) {\n          throw new Exception(\"Permission denied\");\n        }\n\n        $childRow->beforeDelete($childRow);\n\n        $id = $childRow->id;\n\n        $childRow->delete();\n\n        $childRow->afterDelete($id);\n      });\n\n      return response()->json([\n        'id' => $id,\n        'status' => 'success'\n      ]);\n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n\n  public function relation_" + this.childName + "_view_create(Request $request, " + this.parentTable.name + " $parentRow) {\n    $mode = \"create\";\n    return view('" + this.parentTable.name_raw + "." + this.childName + ".update', compact(\"mode\", \"parentRow\")); \n  }\n\n  public function relation_" + this.childName + "_view_update(Request $request, " + this.parentTable.name + " $parentRow, " + this.childTable.name + " $row) {\n    $mode = \"update\";\n\n    $data = $row;\n    return view('" + this.parentTable.name_raw + "." + this.childName + ".update', compact(\"mode\", \"parentRow\", \"row\", \"data\")); \n  }\n\n  public function relation_" + this.childName + "_view_list(Request $request, " + this.parentTable.name + " $parentRow) {\n    return view('" + this.parentTable.name_raw + "." + this.childName + ".list', compact(\"parentRow\")); \n  }\n          ";
        else if (mode == "Repository_ChildCRUD_create")
            var res = "\n        if (isset($data['" + this.childName + "']) && is_array($data['" + this.childName + "'])) {\n          foreach ($data['" + this.childName + "'] as $item) {\n            if (!is_array($item)) continue;\n            $item['" + this.childColumn.name + "'] = $row->id;\n            $item_model = (new \\App\\Repositories\\Chombrain\\" + this.childTable.name + "Repository)->firstOrNew(['id' => $item['id'] ?? 0], $item);\n          }\n        }\n      ";
        else if (mode == "Repository_ChildCRUD_update")
            var res = "\n        if (isset($data['" + this.childName + "']) && is_array($data['" + this.childName + "'])) {\n          $removed_ids = $row->" + this.childName + "->pluck('id')->diff(collect($data['" + this.childName + "'])->pluck('id'))->all();\n          (new \\App\\Repositories\\Chombrain\\" + this.childTable.name + "Repository)->destroy($removed_ids);\n\n          foreach ($data['" + this.childName + "'] as $item) {\n            if (!is_array($item)) continue;\n            $item['" + this.childColumn.name + "'] = $row->id;\n            $item_model = (new \\App\\Repositories\\Chombrain\\" + this.childTable.name + "Repository)->firstOrNew(['id' => $item['id'] ?? 0], $item);\n            $item_model->" + this.childColumn.name + " = $row->id;\n            $item_model->save();\n          }\n        }\n      ";
        else if (mode == "Route")
            var res = "\n      Route::get('/{row}/" + this.childName + "', '" + this.parentTable.name + "Controller@relation_" + this.childName + "')->name('" + this.childTable.name_raw + "_get');\n      Route::post('/{row}/" + this.childName + "/create', '" + this.parentTable.name + "Controller@relation_" + this.childName + "_create')->name('" + this.childTable.name_raw + "_create');\n      Route::post('/{row}/" + this.childName + "/{childRow}/update', '" + this.parentTable.name + "Controller@relation_" + this.childName + "_update')->name('" + this.childTable.name_raw + "_update');\n      Route::post('/{row}/" + this.childName + "/{childRow}/delete', '" + this.parentTable.name + "Controller@relation_" + this.childName + "_delete')->name('" + this.childTable.name_raw + "_delete');\n      ";
        else if (mode == "RouteView")
            var res = "\n      Route::get('/{parentRow}/" + this.childName + "/{row}/update', '" + this.parentTable.name + "Controller@relation_" + this.childName + "_view_update')->name('relation_" + this.childTable.name_raw + "_view_update');\n      Route::get('/{parentRow}/" + this.childName + "/create', '" + this.parentTable.name + "Controller@relation_" + this.childName + "_view_create')->name('relation_" + this.childTable.name_raw + "_view_create');\n      Route::get('/{parentRow}/" + this.childName + "/', '" + this.parentTable.name + "Controller@relation_" + this.childName + "_view_list')->name('relation_" + this.childTable.name_raw + "_view_list');\n      ";
        return res;
    };
    return OneToMany;
}(relation_1.default));
exports.default = OneToMany;
//# sourceMappingURL=onetomany.js.map