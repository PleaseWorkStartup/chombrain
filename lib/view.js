import Table from "./table";
class View extends Table {
    constructor(table_name, migration, sql = "") {
        super(table_name, migration);
        this.sql = "";
        this.crud_only = true;
        this.sql = sql;
    }
}
export default View;
//# sourceMappingURL=view.js.map