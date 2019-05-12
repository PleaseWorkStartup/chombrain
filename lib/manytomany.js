import Relation from "./relation";
import * as _ from 'lodash';
class ManyToMany extends Relation {
    constructor() {
        super();
    }
    renderChild(mode = "Model") {
        if (mode == "Model")
            var res = `
  public function ${this.parentName}()
  {
    return $this->belongsToMany('App\\Models\\Chombrain\\${this.parentTable.view_name}','${this.pivotTable.view_name}','${this.childColumn.name}','${this.parentColumn.name}')
            ->withPivot(${JSON.stringify(_.map(this.pivotTable.view_table.cols, "name"))})
            ->withTimestamps();
  }
`;
        else if (mode == "Migration")
            var res = `
        
      `;
        return res;
    }
    renderParent(mode = "Model") {
        if (mode == "Model")
            var res = `
  public function ${this.childName}()
  {
    return $this->belongsToMany('App\\Models\\Chombrain\\${this.childTable.view_name}','${this.pivotTable.view_name}','${this.parentColumn.name}','${this.childColumn.name}')
            ->withPivot(${JSON.stringify(_.map(this.pivotTable.view_table.cols, "name"))})
            ->withTimestamps();
  }
`;
        else if (mode == "Migration")
            var res = `
        
      `;
        return res;
    }
}
export default ManyToMany;
//# sourceMappingURL=manytomany.js.map