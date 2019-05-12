import Renderer from './Renderer';
class ModelEventObserverRenderer extends Renderer {
    constructor(table) {
        super("../../app/Models/Chombrain/" + table.name + "/" + table.name + "EventObserver.php");
        this.table = table;
    }
    getRenderStr() {
        let res = `<?php
namespace App\\Models\\Chombrain\\${this.table.name};

use App\\Models\\Chombrain\\${this.table.name};

class ${this.table.name}EventObserver
{
  /**
   * Handle the ${this.table.name} "creating" event.
   *
   * @param  \\App\\Models\\Chombrain\\${this.table.name}  $row
   * @return void
   */
  public function creating(${this.table.name} $row)
  {
    $req = request()->all();
    ${this.table.name}::beforeCreate($req);
  }

  /**
   * Handle the ${this.table.name} "created" event.
   *
   * @param  \\App\\Models\\Chombrain\\${this.table.name}  $row
   * @return void
   */
  public function created(${this.table.name} $row)
  {
    $row->afterCreate($row);
  }

  /**
   * Handle the ${this.table.name} "updating" event.
   *
   * @param  \\App\\Models\\Chombrain\\${this.table.name}  $row
   * @return void
   */
  public function updating(${this.table.name} $row)
  {
    $req = request()->all();
    $row->beforeUpdate($req,$row);
  }

  /**
   * Handle the ${this.table.name} "updated" event.
   *
   * @param  \\App\\Models\\Chombrain\\${this.table.name}  $row
   * @return void
   */
  public function updated(${this.table.name} $row)
  {
    $row->afterUpdate($row);
  }

  /**
   * Handle the ${this.table.name} "deleting" event.
   *
   * @param  \\App\\Models\\Chombrain\\${this.table.name}  $row
   * @return void
   */
  public function deleting(${this.table.name} $row)
  {
    $row->beforeDelete($row);
  }

  /**
   * Handle the ${this.table.name} "deleted" event.
   *
   * @param  \\App\\Models\\Chombrain\\${this.table.name}  $row
   * @return void
   */
  public function deleted(${this.table.name} $row)
  {
    $row->afterDelete($row->id);
  }
}
`;
        return res;
    }
    ;
    renderParts() {
    }
    ;
}
export default ModelEventObserverRenderer;
//# sourceMappingURL=ModelEventObserverRenderer.js.map