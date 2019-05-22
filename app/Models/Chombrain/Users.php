<?php
namespace App\Models\Chombrain;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\UsersPermission;
use App\Models\Users\UsersAutofill;



class Users extends Model {

  
    use UsersPermission;
    use UsersAutofill;


  protected $table = 'users';

  

  /**
   * all columns of this table
   * 
   */
  public $allColumns = ["name","email","email_verified_at","password","remember_token","confirmed","profile","settings","is_admin"];
  
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ["name","email","email_verified_at","password","remember_token","confirmed","profile","settings","is_admin"];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = ["password","remember_token"];

  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
    'profile' => 'array',
'settings' => 'array'
  ];

  /**
   * default value of each column (only if value of that column is null)
   *
   * @var array
   */
  protected $attributes = [
    'profile' => '[]',
'settings' => '[]'
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
    return $this->hasOne('App\Models\Chombrain\Users',"id","id");
  }

  public function view() {
    return $this->hasOne('App\Models\Chombrain\Users',"id","id");
  }

  public function refresh() {
    return Users::find($this->id);
  }

  

  

}
