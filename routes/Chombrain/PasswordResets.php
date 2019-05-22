<?php
Route::group(['as' => 'password_resets.api.', 
  'prefix' => 'api/password_resets', 
  'middleware' => ["auth"]], 
  function () {

  //Base action
  Route::get('/', 'PasswordResetsController@list')->name('list');
  Route::post('/create', 'PasswordResetsController@create')->name('create');
  Route::get('/{row}', 'PasswordResetsController@get')->name('get');
  Route::post('/{row}/update', 'PasswordResetsController@update')->name('update');
  Route::post('/{row}/delete', 'PasswordResetsController@delete')->name('delete');

  
    //Column email
    Route::get('/{row}/col/email', 'PasswordResetsController@singlecol_email')->name('singlecol_email_get');
    


    //Column token
    Route::get('/{row}/col/token', 'PasswordResetsController@singlecol_token')->name('singlecol_token_get');
    

  

  

});

Route::group(['as' => 'password_resets.views.', 
  'prefix' => 'password_resets', 
  'middleware' => ["auth"]], 
  function () {

  //Base action
  Route::get('/', 'PasswordResetsController@view_list')->name('list');
  Route::get('/create', 'PasswordResetsController@view_create')->name('create');
  Route::get('/{row}/update',  'PasswordResetsController@view_update')->name('update');

  

    



    

  

  

});
