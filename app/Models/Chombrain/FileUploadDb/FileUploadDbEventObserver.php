<?php
namespace App\Models\Chombrain\FileUploadDb;

use App\Models\Chombrain\FileUploadDb;

class FileUploadDbEventObserver
{
  /**
   * Handle the FileUploadDb "creating" event.
   *
   * @param  \App\Models\Chombrain\FileUploadDb  $row
   * @return void
   */
  public function creating(FileUploadDb $row)
  {
    $req = request()->all();
    FileUploadDb::beforeCreate($req);
  }

  /**
   * Handle the FileUploadDb "created" event.
   *
   * @param  \App\Models\Chombrain\FileUploadDb  $row
   * @return void
   */
  public function created(FileUploadDb $row)
  {
    $row->afterCreate($row);
  }

  /**
   * Handle the FileUploadDb "updating" event.
   *
   * @param  \App\Models\Chombrain\FileUploadDb  $row
   * @return void
   */
  public function updating(FileUploadDb $row)
  {
    $req = request()->all();
    $row->beforeUpdate($req,$row);
  }

  /**
   * Handle the FileUploadDb "updated" event.
   *
   * @param  \App\Models\Chombrain\FileUploadDb  $row
   * @return void
   */
  public function updated(FileUploadDb $row)
  {
    $row->afterUpdate($row);
  }

  /**
   * Handle the FileUploadDb "deleting" event.
   *
   * @param  \App\Models\Chombrain\FileUploadDb  $row
   * @return void
   */
  public function deleting(FileUploadDb $row)
  {
    $row->beforeDelete($row);
  }

  /**
   * Handle the FileUploadDb "deleted" event.
   *
   * @param  \App\Models\Chombrain\FileUploadDb  $row
   * @return void
   */
  public function deleted(FileUploadDb $row)
  {
    $row->afterDelete($row->id);
  }
}
