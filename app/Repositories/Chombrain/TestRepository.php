<?php
namespace App\Repositories\Chombrain;

use Illuminate\Http\Request;
use App\Repositories\Repository;
use App\Models\Chombrain\Users;
use App\Models\Chombrain\PasswordResets;
use App\Models\Chombrain\FileUploadDb;
use App\Models\Chombrain\Test;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TestRepository extends Repository {
  public function model() {
    return 'App\Models\Chombrain\Test';
  }
  
  public function get($row, array $args = []) {
    $output = $row;

    if (!$row) return null;

    if (!$row->canRead()) {
      throw new \Exception("Permission denied");
    }

    $row->onRead($row);

    return $output;
  }

  public function create(array $data) {
    //$data = $request->all();

    $row = new Test;

    DB::transaction(function () use ($data, $row) {
      if (!Test::canCreate($data)) {
        throw new \Exception("Permission denied");
      }

      Test::beforeCreate($data);
      
      $row->fill($data);
      $row->createAutofill($data,$row);
      $row->save();
      $row->afterCreate($row);

      
    });

    return $row;
  }

  public function update($row, array $data) {
    //$data = $request->all();

    DB::transaction(function () use ($data, $row) {
      if (!$row->canUpdate($data)) {
        throw new \Exception("Permission denied");
      }

      $row->beforeUpdate($data, $row);
    
      $row->update($data);
      $row->updateAutofill($data, $row);
      $row->touch();
      $row->save();

      $row->afterUpdate($row);

      
    });

    return $row;
  }

  public function delete($row, array $args = []) {
    if (!$row->canDelete()) {
      throw new \Exception("Permission denied");
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
    Test::beforeList();

    $output = Test::filterRecordRules( Test::query() );

    if (!$output) {
      throw new \Exception("Permission Denied");
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
          ->orWhere('id','LIKE','%'.escapeLike($simpleSearch).'%')
            
            ->orWhere('teststring','LIKE','%'.escapeLike($simpleSearch).'%')
        ;
      });
    }

    if (($args["paginate"] ?? false)=="true") {
      $output = $output->paginate();
      $output->appends(request()->except('page'))->links();
    } else {
      $output = $output->get();
    }

    Test::afterList($output);

    return $output;
  }
}
