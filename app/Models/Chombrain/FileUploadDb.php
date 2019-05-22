<?php
namespace App\Models\Chombrain;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\FileUploadDb\FileUploadDbPermission;
use App\Models\FileUploadDb\FileUploadDbAutofill;



class FileUploadDb extends Model {

  
    use FileUploadDbPermission;
    use FileUploadDbAutofill;


  protected $table = 'file_upload_db';

  

  /**
   * all columns of this table
   * 
   */
  public $allColumns = ["url","filepath","type","extension","mime","original_name","size"];
  
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ["url","filepath","type","extension","mime","original_name","size"];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [];

  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
    
  ];

  /**
   * default value of each column (only if value of that column is null)
   *
   * @var array
   */
  protected $attributes = [
    
  ];

  /**
   * The relations to eager load on every query.
   *
   * @var array
   */
  protected $with = [];

  /**
   * The relationship counts that should be eager loaded on every query.
   *
   * @var array
   */
  protected $withCount = [];

  

  public function nonview() {
    return $this->hasOne('App\Models\Chombrain\FileUploadDb',"id","id");
  }

  public function view() {
    return $this->hasOne('App\Models\Chombrain\FileUploadDb',"id","id");
  }

  public function refresh() {
    return FileUploadDb::find($this->id);
  }

  

  

}
