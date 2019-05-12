import Renderer from './Renderer';
import * as _ from 'lodash';
class RepositoryRenderer extends Renderer {
    constructor(table) {
        super("../../app/Repositories/Chombrain/" + table.name + "Repository.php");
        this.table = table;
    }
    getRenderStr() {
        let res = `<?php
namespace App\\Repositories\\Chombrain;

use Illuminate\\Http\\Request;
use App\\Repositories\\Repository;
${this.table.migration.renderModelsUse()}
use Illuminate\\Support\\Facades\\Auth;
use Illuminate\\Support\\Facades\\DB;

class ${this.table.name}Repository extends Repository {
  public function model() {
    return 'App\\Models\\Chombrain\\${this.table.name}';
  }
  
  public function get($row, array $args = []) {
    $output = $row;

    if (!$row) return null;

    if (!$row->canRead()) {
      throw new \\Exception("Permission denied");
    }

    $row->onRead($row);

    return $output;
  }

  public function create(array $data) {
    //$data = $request->all();

    $row = new ${this.table.name};

    DB::transaction(function () use ($data, $row) {
      if (!${this.table.name}::canCreate($data)) {
        throw new \\Exception("Permission denied");
      }

      ${this.table.name}::beforeCreate($data);
      
      $row->fill($data);
      $row->createAutofill($data,$row);
      $row->save();
      $row->afterCreate($row);

      ${_.map(this.table.parentRelations, (x) => x.renderParent("Repository_ChildCRUD_create")).join("\n\n\t")}
    });

    return $row;
  }

  public function update($row, array $data) {
    //$data = $request->all();

    DB::transaction(function () use ($data, $row) {
      if (!$row->canUpdate($data)) {
        throw new \\Exception("Permission denied");
      }

      $row->beforeUpdate($data, $row);
    
      $row->update($data);
      $row->updateAutofill($data, $row);
      $row->touch();
      $row->save();

      $row->afterUpdate($row);

      ${_.map(this.table.parentRelations, (x) => x.renderParent("Repository_ChildCRUD_update")).join("\n\n\t")}
    });

    return $row;
  }

  public function delete($row, array $args = []) {
    if (!$row->canDelete()) {
      throw new \\Exception("Permission denied");
    }

    DB::transaction(function () use ($row) {
      $row->beforeDelete($row);

      $id = $row->id;

      $row->delete();

      $row->afterDelete($id);
    });

    return $row;
  }

  public function list(array $args = []) {
    ${this.table.name}::beforeList();

    $output = ${this.table.name}::filterRecordRules( ${this.table.view_name}::query() );

    if (!$output) {
      throw new \\Exception("Permission Denied");
    }

    $sortBy = $args["sort_by"] ?? null;
    if (isset($sortBy) && $sortBy !== null) {
      foreach($sortBy as $sort) {
        $sort = explode(" ",trim($sort));
        if (sizeof($sort)==1) {
          $output = $output->orderBy($sort[0],'asc');
        } else {
          if (strcasecmp($sort[1],"DESC") == 0) {
            $output = $output->orderBy($sort[0],'desc');
          } else {
            $output = $output->orderBy($sort[0],'asc');
          }
        }
      }
    }

    $output = $output->orderBy('id','desc');

    $simpleSearch = $args["simple_search"] ?? null;
    if (isset($simpleSearch) && $simpleSearch !== null) {
      $output = $output->where(function ($query) use ($simpleSearch) {
        $query
          ${_.map(this.table.columns, (x) => x.render("SimpleSearchEXP")).join("\n            ")}
        ;
      });
    }

    if (($args["paginate"] ?? false)=="true") {
      $output = $output->paginate();
      $output->appends(request()->except('page'))->links();
    } else {
      $output = $output->get();
    }

    ${this.table.name}::afterList($output);

    return $output;
  }
}
`;
        return res;
    }
    ;
    renderParts() {
    }
    ;
}
export default RepositoryRenderer;
//# sourceMappingURL=RepositoryRenderer.js.map