<?php
Route::group(['as' => 'test.api.', 
  'prefix' => 'api/test', 
  'middleware' => ["auth"]], 
  function () {

  //Base action
  Route::get('/', 'TestController@list')->name('list');
  Route::post('/create', 'TestController@create')->name('create');
  Route::get('/{row}', 'TestController@get')->name('get');
  Route::post('/{row}/update', 'TestController@update')->name('update');
  Route::post('/{row}/delete', 'TestController@delete')->name('delete');

  
    //Column testcolumn
    Route::get('/{row}/col/testcolumn', 'TestController@singlecol_testcolumn')->name('singlecol_testcolumn_get');
    


    //Column teststring
    Route::get('/{row}/col/teststring', 'TestController@singlecol_teststring')->name('singlecol_teststring_get');
    

  

  

});

Route::group(['as' => 'test.views.', 
  'prefix' => 'test', 
  'middleware' => ["auth"]], 
  function () {

  //Base action
  Route::get('/', 'TestController@view_list')->name('list');
  Route::get('/create', 'TestController@view_create')->name('create');
  Route::get('/{row}/update',  'TestController@view_update')->name('update');

  

    



    

  

  

});
