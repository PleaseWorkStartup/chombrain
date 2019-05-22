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
var OneToOne = (function (_super) {
    __extends(OneToOne, _super);
    function OneToOne() {
        return _super.call(this) || this;
    }
    OneToOne.prototype.renderChild = function (mode) {
        if (mode === void 0) { mode = "Model"; }
        if (mode == "Model")
            var res = "\n  public function " + this.parentName + "()\n  {\n    return $this->belongsTo('App\\Models\\Chombrain\\" + this.parentTable.view_name + "','" + this.childColumn.name + "');\n  }\n";
        else if (mode == "Migration") {
            if (this.childTable.crud_only || this.parentTable.crud_only)
                return "";
            var res = "\n      $table->foreign('" + this.childColumn.name + "')\n            ->references('id')\n            ->on('" + this.parentTable.name_raw + "')\n            ->onDelete('" + (this.parentColumn.isNullable() ? 'set null' : 'RESTRICT') + "')\n            ->onUpdate('" + (this.parentColumn.isNullable() ? 'set null' : 'RESTRICT') + "');\n\n      //$table->index('" + this.childColumn.name + "');\n            ";
        }
        else if (mode == "MigrationDown") {
            if (this.childTable.crud_only || this.parentTable.crud_only)
                return "";
            var res = "\n      $table->dropForeign(['" + this.childColumn.name + "']);\n            ";
        }
        else if (mode == "ControllerFunc")
            var res = "\n  public function relation_" + this.parentName + "(Request $request," + this.childTable.name + " $row) {\n    try {\n      $output = " + this.parentTable.name + "::filterRecordRules( $row->" + this.parentName + "() );\n\n      if (!$output) {\n        throw new \\Exception(\"Permission Denied\");\n      }\n\n      $output = $output->first();\n\n      return response()->json($output);\n    } catch (Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => $e->getMessage()\n      ], 403);\n    }\n  }\n          ";
        else if (mode == "Route")
            var res = "\n        Route::get('/{row}/" + this.parentTable.name_raw + "', '" + this.childTable.name + "Controller@relation_" + this.parentName + "')->name('" + this.parentTable.name_raw + "_get');\n        ";
        return res;
    };
    OneToOne.prototype.renderParent = function (mode) {
        if (mode === void 0) { mode = "Model"; }
        if (mode == "Model")
            var res = "\n  public function " + this.childName + "()\n  {\n    return $this->hasOne('App\\Models\\Chombrain\\" + this.childTable.view_name + "','" + this.childColumn.name + "');\n  }\n";
        else if (mode == "Migration")
            var res = "\n\n            ";
        else if (mode == "ControllerFunc")
            var res = "\n  public function relation_" + this.childName + "(Request $request," + this.parentTable.name + " $row) {\n    try {\n      $output = " + this.childTable.name + "::filterRecordRules( $row->" + this.childName + "() );\n\n      if (!$output) {\n        throw new \\Exception(\"Permission Denied\");\n      }\n\n      $output = $output->first();\n\n      return response()->json($output);\n    } catch (Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => $e->getMessage()\n      ], 403);\n    }\n  }\n\n  public function relation_" + this.childName + "_create(Request $request," + this.parentTable.name + " $row) {\n    try {\n      $data = $request->all();\n      $data[\"" + this.childColumn.name + "\"] = $row->id;\n\n      DB::transaction(function () use ($data, $row) {\n        if (!" + this.childTable.name + "::canCreate($data)) {\n          throw new Exception(\"Permission denied\");\n          return;\n        }\n\n        $newrow = new " + this.childTable.name + ";\n        $newrow->fill($data);\n        $newrow->createAutofill($data);\n        $newrow->" + this.childColumn.name + " = $row->id;\n        $newrow->save();\n      });\n\n      return response()->json([\n        'status' => 'success',\n        'data' => $newrow\n      ]);\n    } catch (Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => $e->getMessage()\n      ], 403);\n    }\n  }\n      ";
        else if (mode == "Route")
            var res = "\n      Route::get('/{row}/" + this.childName + "', '" + this.parentTable.name + "Controller@relation_" + this.childName + "')->name('" + this.childTable.name_raw + "_get');\n      ";
        return res;
    };
    return OneToOne;
}(relation_1.default));
exports.default = OneToOne;
//# sourceMappingURL=onetoone.js.map