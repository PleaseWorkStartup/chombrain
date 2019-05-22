import File from './File'
import Table from '../lib/table';
import Renderer from './Renderer';
import * as _ from 'lodash'
import * as path from 'path';

class RouteRenderer extends Renderer {
  public file: File;
  public table: Table;
  
  constructor(table: Table) {
    super(path.join(process.cwd(),"../../routes/Chombrain/"+table.name+".php"))
    this.table = table
  }

  protected getRenderStr(): string {
    let res =
`<?php
Route::group(['as' => '${this.table.name_raw}.api.', 
  'prefix' => 'api/${this.table.name_raw}', 
  'middleware' => ${JSON.stringify(this.table.middleware_api)}], 
  function () {

  //Base action
  Route::get('/', '${this.table.name}Controller@list')->name('list');
  Route::post('/create', '${this.table.name}Controller@create')->name('create');
  Route::get('/{row}', '${this.table.name}Controller@get')->name('get');
  Route::post('/{row}/update', '${this.table.name}Controller@update')->name('update');
  Route::post('/{row}/delete', '${this.table.name}Controller@delete')->name('delete');

  ${_.map(this.table.cols,(x)=>x.render("Route")).join("\n\n")}

  ${_.map(this.table.childRelations,(x)=>x.renderChild("Route")).join("\n\n")}

  ${_.map(this.table.parentRelations,(x)=>x.renderParent("Route")).join("\n\n")}

});

Route::group(['as' => '${this.table.name_raw}.views.', 
  'prefix' => '${this.table.name_raw}', 
  'middleware' => ${JSON.stringify(this.table.middleware_view)}], 
  function () {

  //Base action
  Route::get('/', '${this.table.name}Controller@view_list')->name('list');
  Route::get('/create', '${this.table.name}Controller@view_create')->name('create');
  Route::get('/{row}/update',  '${this.table.name}Controller@view_update')->name('update');

  ${_.map(this.table.cols,(x)=>x.render("RouteView")).join("\n\n")}

  ${_.map(this.table.childRelations,(x)=>x.renderChild("RouteView")).join("\n\n")}

  ${_.map(this.table.parentRelations,(x)=>x.renderParent("RouteView")).join("\n\n")}

});
`
    return res;
  };

  protected renderParts(): void {

  };
}

export default RouteRenderer;