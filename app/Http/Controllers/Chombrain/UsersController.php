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

class UsersController extends Controller {

  private $repo;

  function __construct(UsersRepository $repo) {
    $this->repo = $repo;
  }

  public function get(Request $request,Users $row) {
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

  public function update(Request $request,Users $row) {
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

  public function delete(Request $request,Users $row) {
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
    return view('users.list');
  }

  public function view_create(Request $request) {
    $mode = "create";
    return view('users.update', compact("mode")); 
  }

  public function view_update(Request $request, Users $row) {
    $mode = "update";
    $data = $row;
    return view('users.update', compact("mode","row","data")); 
  }

  
    public function singlecol_name(Request $request, Users $row) {
      $row->onRead($row);
      return response()->json($row->name);
    }
    


    public function singlecol_email(Request $request, Users $row) {
      $row->onRead($row);
      return response()->json($row->email);
    }
    


    public function singlecol_email_verified_at(Request $request, Users $row) {
      $row->onRead($row);
      return response()->json($row->email_verified_at);
    }
    






    public function singlecol_confirmed(Request $request, Users $row) {
      $row->onRead($row);
      return response()->json($row->confirmed);
    }
    


    public function singlecol_profile(Request $request, Users $row) {
      $row->onRead($row);
      return response()->json($row->profile);
    }
    


    public function singlecol_settings(Request $request, Users $row) {
      $row->onRead($row);
      return response()->json($row->settings);
    }
    


    public function singlecol_is_admin(Request $request, Users $row) {
      $row->onRead($row);
      return response()->json($row->is_admin);
    }
    

  

  
}
