<?php
namespace App\Models\Chombrain\Test;

use App\Models\Chombrain\Test;

class TestEventObserver
{
  /**
   * Handle the Test "creating" event.
   *
   * @param  \App\Models\Chombrain\Test  $row
   * @return void
   */
  public function creating(Test $row)
  {
    $req = request()->all();
    Test::beforeCreate($req);
  }

  /**
   * Handle the Test "created" event.
   *
   * @param  \App\Models\Chombrain\Test  $row
   * @return void
   */
  public function created(Test $row)
  {
    $row->afterCreate($row);
  }

  /**
   * Handle the Test "updating" event.
   *
   * @param  \App\Models\Chombrain\Test  $row
   * @return void
   */
  public function updating(Test $row)
  {
    $req = request()->all();
    $row->beforeUpdate($req,$row);
  }

  /**
   * Handle the Test "updated" event.
   *
   * @param  \App\Models\Chombrain\Test  $row
   * @return void
   */
  public function updated(Test $row)
  {
    $row->afterUpdate($row);
  }

  /**
   * Handle the Test "deleting" event.
   *
   * @param  \App\Models\Chombrain\Test  $row
   * @return void
   */
  public function deleting(Test $row)
  {
    $row->beforeDelete($row);
  }

  /**
   * Handle the Test "deleted" event.
   *
   * @param  \App\Models\Chombrain\Test  $row
   * @return void
   */
  public function deleted(Test $row)
  {
    $row->afterDelete($row->id);
  }
}
