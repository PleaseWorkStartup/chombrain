import Type from "./Type";
export default class BaseType extends Type {
    renderMigration() {
        let res = ``;
        return res;
    }
    renderRouteAPI() {
        let res = `
    //Column ${this.col.name}
    Route::get('/{row}/col/${this.col.name}', '${this.col.table.name}Controller@singlecol_${this.col.name}')->name('singlecol_${this.col.name}_get');
    `;
        return res;
    }
    renderRouteView() {
        let res = `

    `;
        return res;
    }
    renderController() {
        let res = `
    public function singlecol_${this.col.name}(Request $request, ${this.col.table.name} $row) {
      $row->onRead($row);
      return response()->json($row->${this.col.name});
    }
    `;
        return res;
    }
    afterConstruct() {
    }
}
//# sourceMappingURL=BaseType.js.map