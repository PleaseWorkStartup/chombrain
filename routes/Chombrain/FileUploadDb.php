<?php
Route::group(['as' => 'file_upload_db.api.', 
  'prefix' => 'api/file_upload_db', 
  'middleware' => ["auth"]], 
  function () {

  //Base action
  Route::get('/', 'FileUploadDbController@list')->name('list');
  Route::post('/create', 'FileUploadDbController@create')->name('create');
  Route::get('/{row}', 'FileUploadDbController@get')->name('get');
  Route::post('/{row}/update', 'FileUploadDbController@update')->name('update');
  Route::post('/{row}/delete', 'FileUploadDbController@delete')->name('delete');

  
    //Column url
    Route::get('/{row}/col/url', 'FileUploadDbController@singlecol_url')->name('singlecol_url_get');
    


    //Column filepath
    Route::get('/{row}/col/filepath', 'FileUploadDbController@singlecol_filepath')->name('singlecol_filepath_get');
    


    //Column type
    Route::get('/{row}/col/type', 'FileUploadDbController@singlecol_type')->name('singlecol_type_get');
    


    //Column extension
    Route::get('/{row}/col/extension', 'FileUploadDbController@singlecol_extension')->name('singlecol_extension_get');
    


    //Column mime
    Route::get('/{row}/col/mime', 'FileUploadDbController@singlecol_mime')->name('singlecol_mime_get');
    


    //Column original_name
    Route::get('/{row}/col/original_name', 'FileUploadDbController@singlecol_original_name')->name('singlecol_original_name_get');
    


    //Column size
    Route::get('/{row}/col/size', 'FileUploadDbController@singlecol_size')->name('singlecol_size_get');
    

  

  

});

Route::group(['as' => 'file_upload_db.views.', 
  'prefix' => 'file_upload_db', 
  'middleware' => ["auth"]], 
  function () {

  //Base action
  Route::get('/', 'FileUploadDbController@view_list')->name('list');
  Route::get('/create', 'FileUploadDbController@view_create')->name('create');
  Route::get('/{row}/update',  'FileUploadDbController@view_update')->name('update');

  

    



    



    



    



    



    



    

  

  

});
