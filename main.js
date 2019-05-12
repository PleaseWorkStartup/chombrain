import Migration from './lib/migration';
let $ = new Migration();
$.table("test", (T) => {
    T.column("testcolumn").type("boolean").default(false);
    T.column("teststring", "string").nullable();
});
$.render();
//# sourceMappingURL=main.js.map