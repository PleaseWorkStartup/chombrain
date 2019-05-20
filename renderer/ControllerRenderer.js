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
var ControllerRenderer = (function (_super) {
    __extends(ControllerRenderer, _super);
    function ControllerRenderer(table) {
        var _this = _super.call(this, path.join(process.cwd(), "../../app/Http/Controllers/Chombrain/" + table.name + "Controller.php")) || this;
        _this.table = table;
        return _this;
    }
    ControllerRenderer.prototype.getRenderStr = function () {
        var res = "<?php\nnamespace App\\Http\\Controllers\\Chombrain;\n\nuse Illuminate\\Http\\Request;\nuse App\\Http\\Controllers\\Controller;\n" + this.table.migration.renderModelsUse() + "\n" + this.table.migration.renderRepositoriesUse() + "\nuse Illuminate\\Support\\Facades\\Auth;\nuse Illuminate\\Support\\Facades\\DB;\n\nclass " + this.table.name + "Controller extends Controller {\n\n  private $repo;\n\n  function __construct(" + this.table.name + "Repository $repo) {\n    $this->repo = $repo;\n  }\n\n  public function get(Request $request," + this.table.view_name + " $row) {\n    try {\n      $output = $this->repo->get($row,$request->all());\n\n      return response()->json($output);\n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n\n  public function create(Request $request) {\n    try {\n      $row = $this->repo->create($request->all());\n\n      return response()->json([\n        'id' => $row->id,\n        'status' => 'success',\n        'data' => $row\n      ]);\n      \n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n\n  public function update(Request $request," + this.table.name + " $row) {\n    try {\n      $row = $this->repo->update($row, $request->all());\n\n      return response()->json([\n        'id' => $row->id,\n        'status' => 'success',\n        'data' => $row\n      ]);\n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n\n  public function delete(Request $request," + this.table.name + " $row) {\n    try {\n      $row = $this->repo->delete($row);\n\n      return response()->json([\n        'id' => $row->id,\n        'status' => 'success',\n        'data' => $row\n      ]);\n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n\n  public function list(Request $request) {\n    try {\n      $output = $this->repo->list($request->all());\n\n      return response()->json($output);\n    } catch (\\Exception $e) {\n      return response()->json([\n        \"status\" => \"forbidden\",\n        \"message\" => parseSQLException($e->getMessage())\n      ], 403);\n    }\n  }\n\n  public function view_list(Request $request) {\n    return view('" + this.table.name_raw + ".list');\n  }\n\n  public function view_create(Request $request) {\n    $mode = \"create\";\n    return view('" + this.table.name_raw + ".update', compact(\"mode\")); \n  }\n\n  public function view_update(Request $request, " + this.table.name + " $row) {\n    $mode = \"update\";\n    $data = $row;\n    return view('" + this.table.name_raw + ".update', compact(\"mode\",\"row\",\"data\")); \n  }\n\n  " + _.map(this.table.cols, function (x) { return x.render("ControllerFunc"); }).join("\n\n") + "\n\n  " + _.map(this.table.childRelations, function (x) { return x.renderChild("ControllerFunc"); }).join("\n\n\t") + "\n\n  " + _.map(this.table.parentRelations, function (x) { return x.renderParent("ControllerFunc"); }).join("\n\n\t") + "\n}\n";
        return res;
    };
    ;
    ControllerRenderer.prototype.renderParts = function () {
    };
    ;
    return ControllerRenderer;
}(Renderer_1.default));
exports.default = ControllerRenderer;
//# sourceMappingURL=ControllerRenderer.js.map