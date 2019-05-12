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
var ControllerRenderer = (function (_super) {
    __extends(ControllerRenderer, _super);
    function ControllerRenderer(table) {
        var _this = _super.call(this, "../../app/Http/Controllers/ChomBrain/" + table.name + "Controller.php") || this;
        _this.table = table;
        return _this;
    }
    ControllerRenderer.prototype.getRenderStr = function () {
        var res = "<?php\nnamespace App\\Http\\Controllers\\ChomBrain;\n\nuse Illuminate\\Http\\Request;\nuse App\\Http\\Controllers\\Controller;\nuse App\\Models\\ChomBrain\\" + this.table.name + ";\nuse Illuminate\\Support\\Facades\\Auth;\n\nclass " + this.table.name + "Controller extends Controller {\n  public function get(Request $request," + this.table.name + " $row) {\n    try {\n      $output = $row;\n\n      if (!$row->canRead()) {\n        throw new Exception(\"Permission denied\");\n      }\n\n      return response()->json($output);\n    } catch (Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => $e->getMessage()\n      ], 403);\n    }\n  }\n\n  public function create(Request $request) {\n    try {\n      $row = " + this.table.name + "::create($request->all());\n      return response()->json([\n        'status' => 'success',\n        'data' => $skill\n      ]);\n    } catch (Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => $e->getMessage()\n      ], 403);\n    }\n  }\n\n  public function update(Request $request," + this.table.name + " $row) {\n    try {\n      $data = $request->all();\n\n      if (!$row->canUpdate($data)) {\n        throw new Exception(\"Permission denied\");\n      }\n\n      $row->fill($data);\n      $row->updateAutofill();\n      $row->save();\n\n      return response()->json([\n        'status' => 'success',\n        'data' => $skill\n      ]);\n    } catch (Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => $e->getMessage()\n      ], 403);\n    }\n  }\n\n  public function delete(Request $request," + this.table.name + " $row) {\n    try {\n      if (!$row->canDelete()) {\n        throw new Exception(\"Permission denied\");\n      }\n\n      $row->delete();\n\n      return response()->json([\n        'status' => 'success'\n      ]);\n    } catch (Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => $e->getMessage()\n      ], 403);\n    }\n  }\n}\n";
        return res;
    };
    ;
    ControllerRenderer.prototype.renderParts = function () {
    };
    ;
    return ControllerRenderer;
}(Renderer_1.default));
exports.default = ControllerRenderer;
//# sourceMappingURL=ControllerRenderer.1.js.map