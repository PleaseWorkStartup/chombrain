<?php
Route::group(['as' => 'users.api.', 
  'prefix' => 'api/users', 
  'middleware' => ["auth"]], 
  function () {

  //Base action
  Route::get('/', 'UsersController@list')->name('list');
  Route::post('/create', 'UsersController@create')->name('create');
  Route::get('/{row}', 'UsersController@get')->name('get');
  Route::post('/{row}/update', 'UsersController@update')->name('update');
  Route::post('/{row}/delete', 'UsersController@delete')->name('delete');

  
    //Column name
    Route::get('/{row}/col/name', 'UsersController@singlecol_name')->name('singlecol_name_get');
    


    //Column email
    Route::get('/{row}/col/email', 'UsersController@singlecol_email')->name('singlecol_email_get');
    


    //Column email_verified_at
    Route::get('/{row}/col/email_verified_at', 'UsersController@singlecol_email_verified_at')->name('singlecol_email_verified_at_get');
    






    //Column confirmed
    Route::get('/{row}/col/confirmed', 'UsersController@singlecol_confirmed')->name('singlecol_confirmed_get');
    


    //Column profile
    Route::get('/{row}/col/profile', 'UsersController@singlecol_profile')->name('singlecol_profile_get');
    


    //Column settings
    Route::get('/{row}/col/settings', 'UsersController@singlecol_settings')->name('singlecol_settings_get');
    


    //Column is_admin
    Route::get('/{row}/col/is_admin', 'UsersController@singlecol_is_admin')->name('singlecol_is_admin_get');
    

  

  

});

Route::group(['as' => 'users.views.', 
  'prefix' => 'users', 
  'middleware' => ["auth"]], 
  function () {

  //Base action
  Route::get('/', 'UsersController@view_list')->name('list');
  Route::get('/create', 'UsersController@view_create')->name('create');
  Route::get('/{row}/update',  'UsersController@view_update')->name('update');

  

    



    



    







    



    



    



    

  

  

});
