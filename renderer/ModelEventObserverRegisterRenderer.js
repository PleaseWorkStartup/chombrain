import Renderer from './Renderer';
class ModelEventObserverRegisterRenderer extends Renderer {
    constructor(migration) {
        super("../../app/Chombrain/modelobserverregister.php");
        this.migration = migration;
    }
    getRenderStr() {
        let res = `<?php
${this.migration.renderModelsUse()}
${this.migration.tables.map((x) => "use App\\Models\\Chombrain\\" + x.name + "\\" + x.name + "EventObserver;").join("\n")}

if (! function_exists('___registerModelObserver')) {
  function ___registerModelObserver() {
    ${this.migration.tables.map((table) => `
      ${table.is_view ? `${table.name}::observe(${table.nonview_table.name}EventObserver::class);` : `${table.name}::observe(${table.name}EventObserver::class);`}
    `).join("")}
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
export default ModelEventObserverRegisterRenderer;
//# sourceMappingURL=ModelEventObserverRegisterRenderer.js.map