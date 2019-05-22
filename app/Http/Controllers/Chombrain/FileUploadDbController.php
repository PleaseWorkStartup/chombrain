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

class FileUploadDbController extends Controller {

  private $repo;

  function __construct(FileUploadDbRepository $repo) {
    $this->repo = $repo;
  }

  public function get(Request $request,FileUploadDb $row) {
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

  public function update(Request $request,FileUploadDb $row) {
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

  public function delete(Request $request,FileUploadDb $row) {
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
    return view('file_upload_db.list');
  }

  public function view_create(Request $request) {
    $mode = "create";
    return view('file_upload_db.update', compact("mode")); 
  }

  public function view_update(Request $request, FileUploadDb $row) {
    $mode = "update";
    $data = $row;
    return view('file_upload_db.update', compact("mode","row","data")); 
  }

  
    public function singlecol_url(Request $request, FileUploadDb $row) {
      $row->onRead($row);
      return response()->json($row->url);
    }
    


    public function singlecol_filepath(Request $request, FileUploadDb $row) {
      $row->onRead($row);
      return response()->json($row->filepath);
    }
    


    public function singlecol_type(Request $request, FileUploadDb $row) {
      $row->onRead($row);
      return response()->json($row->type);
    }
    


    public function singlecol_extension(Request $request, FileUploadDb $row) {
      $row->onRead($row);
      return response()->json($row->extension);
    }
    


    public function singlecol_mime(Request $request, FileUploadDb $row) {
      $row->onRead($row);
      return response()->json($row->mime);
    }
    


    public function singlecol_original_name(Request $request, FileUploadDb $row) {
      $row->onRead($row);
      return response()->json($row->original_name);
    }
    


    public function singlecol_size(Request $request, FileUploadDb $row) {
      $row->onRead($row);
      return response()->json($row->size);
    }
    

  

  
}
