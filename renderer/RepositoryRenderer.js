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
var RepositoryRenderer = (function (_super) {
    __extends(RepositoryRenderer, _super);
    function RepositoryRenderer(table) {
        var _this = _super.call(this, path.join(process.cwd(), "../../app/Repositories/Chombrain/" + table.name + "Repository.php")) || this;
        _this.table = table;
        return _this;
    }
    RepositoryRenderer.prototype.getRenderStr = function () {
        var res = "<?php\nnamespace App\\Repositories\\Chombrain;\n\nuse Illuminate\\Http\\Request;\nuse App\\Repositories\\Repository;\n" + this.table.migration.renderModelsUse() + "\nuse Illuminate\\Support\\Facades\\Auth;\nuse Illuminate\\Support\\Facades\\DB;\n\nclass " + this.table.name + "Repository extends Repository {\n  public function model() {\n    return 'App\\Models\\Chombrain\\" + this.table.name + "';\n  }\n  \n  public function get($row, array $args = []) {\n    $output = $row;\n\n    if (!$row) return null;\n\n    if (!$row->canRead()) {\n      throw new \\Exception(\"Permission denied\");\n    }\n\n    $row->onRead($row);\n\n    return $output;\n  }\n\n  public function create(array $data) {\n    //$data = $request->all();\n\n    $row = new " + this.table.name + ";\n\n    DB::transaction(function () use ($data, $row) {\n      if (!" + this.table.name + "::canCreate($data)) {\n        throw new \\Exception(\"Permission denied\");\n      }\n\n      " + this.table.name + "::beforeCreate($data);\n      \n      $row->fill($data);\n      $row->createAutofill($data,$row);\n      $row->save();\n      $row->afterCreate($row);\n\n      " + _.map(this.table.parentRelations, function (x) { return x.renderParent("Repository_ChildCRUD_create"); }).join("\n\n\t") + "\n    });\n\n    return $row;\n  }\n\n  public function update($row, array $data) {\n    //$data = $request->all();\n\n    DB::transaction(function () use ($data, $row) {\n      if (!$row->canUpdate($data)) {\n        throw new \\Exception(\"Permission denied\");\n      }\n\n      $row->beforeUpdate($data, $row);\n    \n      $row->update($data);\n      $row->updateAutofill($data, $row);\n      $row->touch();\n      $row->save();\n\n      $row->afterUpdate($row);\n\n      " + _.map(this.table.parentRelations, function (x) { return x.renderParent("Repository_ChildCRUD_update"); }).join("\n\n\t") + "\n    });\n\n    return $row;\n  }\n\n  public function delete($row, array $args = []) {\n    if (!$row->canDelete()) {\n      throw new \\Exception(\"Permission denied\");\n    }\n\n    DB::transaction(function () use ($row) {\n      $row->beforeDelete($row);\n\n      $id = $row->id;\n\n      $row->delete();\n\n      $row->afterDelete($id);\n    });\n\n    return $row;\n  }\n\n  public function list(array $args = []) {\n    " + this.table.name + "::beforeList();\n\n    $output = " + this.table.name + "::filterRecordRules( " + this.table.view_name + "::query() );\n\n    if (!$output) {\n      throw new \\Exception(\"Permission Denied\");\n    }\n\n    $sortBy = $args[\"sort_by\"] ?? null;\n    if (isset($sortBy) && $sortBy !== null) {\n      foreach($sortBy as $sort) {\n        $sort = explode(\" \",trim($sort));\n        if (sizeof($sort)==1) {\n          $output = $output->orderBy($sort[0],'asc');\n        } else {\n          if (strcasecmp($sort[1],\"DESC\") == 0) {\n            $output = $output->orderBy($sort[0],'desc');\n          } else {\n            $output = $output->orderBy($sort[0],'asc');\n          }\n        }\n      }\n    }\n\n    $output = $output->orderBy('id','desc');\n\n    $simpleSearch = $args[\"simple_search\"] ?? null;\n    if (isset($simpleSearch) && $simpleSearch !== null) {\n      $output = $output->where(function ($query) use ($simpleSearch) {\n        $query\n          " + _.map(this.table.columns, function (x) { return x.render("SimpleSearchEXP"); }).join("\n            ") + "\n        ;\n      });\n    }\n\n    if (($args[\"paginate\"] ?? false)==\"true\") {\n      $output = $output->paginate();\n      $output->appends(request()->except('page'))->links();\n    } else {\n      $output = $output->get();\n    }\n\n    " + this.table.name + "::afterList($output);\n\n    return $output;\n  }\n}\n";
        return res;
    };
    ;
    RepositoryRenderer.prototype.renderParts = function () {
    };
    ;
    return RepositoryRenderer;
}(Renderer_1.default));
exports.default = RepositoryRenderer;
//# sourceMappingURL=RepositoryRenderer.js.map