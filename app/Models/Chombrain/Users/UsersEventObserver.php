<?php
namespace App\Models\Chombrain\Users;

use App\Models\Chombrain\Users;

class UsersEventObserver
{
  /**
   * Handle the Users "creating" event.
   *
   * @param  \App\Models\Chombrain\Users  $row
   * @return void
   */
  public function creating(Users $row)
  {
    $req = request()->all();
    Users::beforeCreate($req);
  }

  /**
   * Handle the Users "created" event.
   *
   * @param  \App\Models\Chombrain\Users  $row
   * @return void
   */
  public function created(Users $row)
  {
    $row->afterCreate($row);
  }

  /**
   * Handle the Users "updating" event.
   *
   * @param  \App\Models\Chombrain\Users  $row
   * @return void
   */
  public function updating(Users $row)
  {
    $req = request()->all();
    $row->beforeUpdate($req,$row);
  }

  /**
   * Handle the Users "updated" event.
   *
   * @param  \App\Models\Chombrain\Users  $row
   * @return void
   */
  public function updated(Users $row)
  {
    $row->afterUpdate($row);
  }

  /**
   * Handle the Users "deleting" event.
   *
   * @param  \App\Models\Chombrain\Users  $row
   * @return void
   */
  public function deleting(Users $row)
  {
    $row->beforeDelete($row);
  }

  /**
   * Handle the Users "deleted" event.
   *
   * @param  \App\Models\Chombrain\Users  $row
   * @return void
   */
  public function deleted(Users $row)
  {
    $row->afterDelete($row->id);
  }
}
