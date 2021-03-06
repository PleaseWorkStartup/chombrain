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
var BaseType_1 = require("./BaseType");
var DictType = (function (_super) {
    __extends(DictType, _super);
    function DictType() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.native_type = "json";
        _this.native_args = args;
        return _this;
    }
    DictType.prototype.renderMigration = function () {
        var res = _super.prototype.renderMigration.call(this);
        res += "";
        return res;
    };
    DictType.prototype.renderRouteAPI = function () {
        var res = _super.prototype.renderRouteAPI.call(this);
        if (this.col._fillable) {
            res += "\n        Route::post('/{row}/col/" + this.col.name + "/create', '" + this.col.table.name + "Controller@singlecol_" + this.col.name + "_append')->name('singlecol_" + this.col.name + "_create');\n        Route::get('/{row}/col/" + this.col.name + "/{index}', '" + this.col.table.name + "Controller@singlecol_" + this.col.name + "_get')->name('singlecol_" + this.col.name + "_get');\n        Route::post('/{row}/col/" + this.col.name + "/{index}/update', '" + this.col.table.name + "Controller@singlecol_" + this.col.name + "_update')->name('singlecol_" + this.col.name + "_update');\n        Route::post('/{row}/col/" + this.col.name + "/{index}/delete', '" + this.col.table.name + "Controller@singlecol_" + this.col.name + "_delete')->name('singlecol_" + this.col.name + "_delete');\n      ";
        }
        if (this.col._hidden) {
            res = '';
        }
        return res;
    };
    DictType.prototype.renderRouteView = function () {
        var res = _super.prototype.renderRouteView.call(this);
        if (this.col._fillable) {
            res += "\n      Route::get('/{row}/col/" + this.col.name + "/{index}/update', '" + this.col.table.name + "Controller@singlecol_" + this.col.name + "_view_update')->name('singlecol_" + this.col.name + "_view_update');\n      Route::get('/{row}/col/" + this.col.name + "/create', '" + this.col.table.name + "Controller@singlecol_" + this.col.name + "_view_create')->name('singlecol_" + this.col.name + "_view_create');\n      ";
        }
        if (this.col._hidden) {
            res = '';
        }
        return res;
    };
    DictType.prototype.renderController = function () {
        var res = _super.prototype.renderController.call(this);
        res += "\n    public function singlecol_" + this.col.name + "_update(Request $request," + this.col.table.name + " $row, $index) {\n      try {\n        $data_single = $row->" + this.col.name + ";\n\n        $data_single[$index] = $request[\"value\"];\n\n        $data = array(\"" + this.col.name + "\"=>$data_single);\n\n        DB::transaction(function () use ($data, $row, $index) {\n  \n          if (!$row->canUpdate( $data )) {\n            throw new Exception(\"Permission denied\");\n          }\n\n          $row->beforeUpdate($data, $row);\n    \n          $row->fill( $data );\n          $row->updateAutofill( $data, $row );\n          $row->touch();\n          $row->save();\n\n          $row->afterUpdate($row);\n\n        });\n  \n        return response()->json([\n          'status' => 'success',\n          'id' => $index,\n          'data' => $row\n        ]);\n      } catch (Exception $e) {\n        return response()->json([\n          'id' => $index,\n          \"status\" => \"forbidden\",\n          \"message\" => $e->getMessage()\n        ], 403);\n      }\n    }\n\n    public function singlecol_" + this.col.name + "_delete(Request $request," + this.col.table.name + " $row, $index) {\n      try {\n        $data_single = $row->" + this.col.name + ";\n\n        unset($data_single[$index]);\n\n        $data = array(\"" + this.col.name + "\"=>$data_single);\n\n        DB::transaction(function () use ($data, $row, $index) {\n  \n          if (!$row->canUpdate( $data )) {\n            throw new Exception(\"Permission denied\");\n          }\n\n          $row->beforeUpdate($data, $row);\n    \n          $row->fill( $data );\n          $row->updateAutofill( $data, $row );\n          $row->touch();\n          $row->save();\n\n          $row->afterUpdate($row);\n\n        });\n  \n        return response()->json([\n          'status' => 'success'\n        ]);\n      } catch (Exception $e) {\n        return response()->json([\n          'id' => $index,\n          \"status\" => \"forbidden\",\n          \"message\" => $e->getMessage()\n        ], 403);\n      }\n    }\n\n    public function singlecol_" + this.col.name + "_get(Request $request," + this.col.table.name + " $row, $index) {\n      try {\n        $output = $row->" + this.col.name + ";\n\n        if ($index >= sizeof($output) || $index < 0) {\n          return response()->json([\n            \"status\" => \"not found\"\n          ], 404);\n        }\n\n        $output = $output[$index];\n  \n        if (!$row->canRead()) {\n          throw new Exception(\"Permission denied\");\n        }\n  \n        return response()->json($output);\n      } catch (Exception $e) {\n        return response()->json([\n          \"status\" => \"forbidden\",\n          \"message\" => $e->getMessage()\n        ], 403);\n      }\n    }\n\n    public function singlecol_" + this.col.name + "_view_create(Request $request, " + this.col.table.name + " $row) {\n      $mode = \"create\";\n      return view('" + this.col.table.name_raw + "." + this.col.name + ".update', compact(\"mode\", \"row\")); \n    }\n\n    public function singlecol_" + this.col.name + "_view_update(Request $request, " + this.col.table.name + " $row, $index) {\n      $mode = \"update\";\n\n      $output = $row->" + this.col.name + ";\n\n      $data = array(\"id\" => $index);\n\n      if (isset($output[$index])) {\n        $data = $output[$index];\n        $data[\"id\"] = $index;\n      }\n\n      \n      return view('" + this.col.table.name_raw + "." + this.col.name + ".update', compact(\"mode\",\"row\",\"data\",\"index\")); \n    }\n    ";
        if (this.col._hidden) {
            res = '';
        }
        return res;
    };
    DictType.prototype.afterConstruct = function () {
    };
    return DictType;
}(BaseType_1.default));
exports.default = DictType;
//# sourceMappingURL=DictType.js.map