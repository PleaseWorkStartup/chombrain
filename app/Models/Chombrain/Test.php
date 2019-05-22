<?php
namespace App\Models\Chombrain;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Test\TestPermission;
use App\Models\Test\TestAutofill;



class Test extends Model {

  
    use TestPermission;
    use TestAutofill;


  protected $table = 'test';

  

  /**
   * all columns of this table
   * 
   */
  public $allColumns = ["testcolumn","teststring"];
  
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ["testcolumn","teststring"];

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
    return $this->hasOne('App\Models\Chombrain\Test',"id","id");
  }

  public function view() {
    return $this->hasOne('App\Models\Chombrain\Test',"id","id");
  }

  public function refresh() {
    return Test::find($this->id);
  }

  

  

}
