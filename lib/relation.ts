import Column from "./column";
import Table from "./table";

abstract class Relation {
  public parentTable: Table;
  public childTable: Table;
  public pivotTable: Table;

  public parentColumn: Column;
  public childColumn: Column;

  public parentName: string;
  public childName: string;

  public isMorph: boolean = false;
  /**
   * On child table
   */
  public morphTypeColumn: Column;
  public morphName: string;

  public onDelete: string = "RESTRICT";

  public abstract renderChild(mode: string): string;
  public abstract renderParent(mode: string): string;

  public parentFilled(): boolean {
    if (this.parentTable || this.parentColumn || this.parentName) return true; else return false;
  }
}

export default Relation