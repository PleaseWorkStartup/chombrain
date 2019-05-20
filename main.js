"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var migration_1 = require("./lib/migration");
var $ = new migration_1.default();
$.table("test", function (T) {
    T.column("testcolumn").type("boolean").default(false);
    T.column("teststring", "string").nullable();
});
$.render();
//# sourceMappingURL=main.js.map