<?php
namespace App\Http\Controllers\Chombrain;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Chombrain\Users;
use App\Models\Chombrain\PasswordResets;
use App\Models\Chombrain\FileUploadDb;
use App\Models\Chombrain\Test;
use App\Repositories\Chombrain\UsersRepository;
use App\Repositories\Chombrain\PasswordResetsRepository;
use App\Repositories\Chombrain\FileUploadDbRepository;
use App\Repositories\Chombrain\TestRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TestController extends Controller {

  private $repo;

  function __construct(TestRepository $repo) {
    $this->repo = $repo;
  }

  public function get(Request $request,Test $row) {
    try {
      $output = $this->repo->get($row,$request->all());

      return response()->json($output);
    } catch (\Exception $e) {
      return response()->json([
        "status" => "forbidden",
        "message" => parseSQLException($e->getMessage())
      ], 403);
    }
  }

  public function create(Request $request) {
    try {
      $row = $this->repo->create($request->all());

      return response()->json([
        'id' => $row->id,
        'status' => 'success',
        'data' => $row
      ]);
      
    } catch (\Exception $e) {
      return response()->json([
        "status" => "forbidden",
        "message" => parseSQLException($e->getMessage())
      ], 403);
    }
  }

  public function update(Request $request,Test $row) {
    try {
      $row = $this->repo->update($row, $request->all());

      return response()->json([
        'id' => $row->id,
        'status' => 'success',
        'data' => $row
      ]);
    } catch (\Exception $e) {
      return response()->json([
        "status" => "forbidden",
        "message" => parseSQLException($e->getMessage())
      ], 403);
    }
  }

  public function delete(Request $request,Test $row) {
    try {
      $row = $this->repo->delete($row);

      return response()->json([
        'id' => $row->id,
        'status' => 'success',
        'data' => $row
      ]);
    } catch (\Exception $e) {
      return response()->json([
        "status" => "forbidden",
        "message" => parseSQLException($e->getMessage())
      ], 403);
    }
  }

  public function list(Request $request) {
    try {
      $output = $this->repo->list($request->all());

      return response()->json($output);
    } catch (\Exception $e) {
      return response()->json([
        "status" => "forbidden",
        "message" => parseSQLException($e->getMessage())
      ], 403);
    }
  }

  public function view_list(Request $request) {
    return view('test.list');
  }

  public function view_create(Request $request) {
    $mode = "create";
    return view('test.update', compact("mode")); 
  }

  public function view_update(Request $request, Test $row) {
    $mode = "update";
    $data = $row;
    return view('test.update', compact("mode","row","data")); 
  }

  
    public function singlecol_testcolumn(Request $request, Test $row) {
      $row->onRead($row);
      return response()->json($row->testcolumn);
    }
    


    public function singlecol_teststring(Request $request, Test $row) {
      $row->onRead($row);
      return response()->json($row->teststring);
    }
    

  

  
}
