<?php
namespace App\Models\Chombrain\PasswordResets;

use App\Models\Chombrain\PasswordResets;

class PasswordResetsEventObserver
{
  /**
   * Handle the PasswordResets "creating" event.
   *
   * @param  \App\Models\Chombrain\PasswordResets  $row
   * @return void
   */
  public function creating(PasswordResets $row)
  {
    $req = request()->all();
    PasswordResets::beforeCreate($req);
  }

  /**
   * Handle the PasswordResets "created" event.
   *
   * @param  \App\Models\Chombrain\PasswordResets  $row
   * @return void
   */
  public function created(PasswordResets $row)
  {
    $row->afterCreate($row);
  }

  /**
   * Handle the PasswordResets "updating" event.
   *
   * @param  \App\Models\Chombrain\PasswordResets  $row
   * @return void
   */
  public function updating(PasswordResets $row)
  {
    $req = request()->all();
    $row->beforeUpdate($req,$row);
  }

  /**
   * Handle the PasswordResets "updated" event.
   *
   * @param  \App\Models\Chombrain\PasswordResets  $row
   * @return void
   */
  public function updated(PasswordResets $row)
  {
    $row->afterUpdate($row);
  }

  /**
   * Handle the PasswordResets "deleting" event.
   *
   * @param  \App\Models\Chombrain\PasswordResets  $row
   * @return void
   */
  public function deleting(PasswordResets $row)
  {
    $row->beforeDelete($row);
  }

  /**
   * Handle the PasswordResets "deleted" event.
   *
   * @param  \App\Models\Chombrain\PasswordResets  $row
   * @return void
   */
  public function deleted(PasswordResets $row)
  {
    $row->afterDelete($row->id);
  }
}
