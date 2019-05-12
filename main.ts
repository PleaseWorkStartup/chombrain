import Table from './lib/table';
import Migration from './lib/migration';

let $ = new Migration()

import manytomany from './lib/manytomany';

$.table("test",(T: Table) => {
  T.column("testcolumn").type("boolean").default(false);
  T.column("teststring","string").nullable();
});

$.render()