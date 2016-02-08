"use strict";
var Util = {
  refreshSelectItems :function(selectElem, values, defaultValue, valfunc, namefunc){
    $.each(selectElem.find("option"), function(i, opt){
      $(opt).remove();
    });

    $.each(values, function(i, each){
      var $option = $("<option></option>")
        .attr("value", valfunc(each))
        .text(namefunc(each));

      selectElem.append($option);
    });

    if (defaultValue && defaultValue.length !== 0){
      selectElem.val(defaultValue);
    }
  }
}

// 確認画面なででの戻るボタンの設定
var BackPostbutton = {
  setup :function(buttonElemID, formElemID, backDestURL ){
      $(document).ready(function(){
        $(buttonElemID).on('click', function(e){
          e.preventDefault();
          var form = $(formElemID).attr("action", backDestURL);
          form.submit();
        });
      });
  }
}

// multipart
var PostMultipartForm = {
  execPost : function(formID, url,onSuccess, onFailer){
    var form = $(formID).get(0);
    var formData;
    try {
      // IE10の場合、FormDataのコンストラクタにformを渡すとエラーが発生するので、
      // exceptionをキャッチする
      formData = new FormData(form);
    } catch(e) {
      // コンストラクタを使用せず、appendメソッドでinputの値を追加する
      formData = new FormData();
      var serializedForm = $(form).serializeArray();
      $(serializedForm).each(function(idx, item) {
        formData.append(item.name, item.value);
      });
      var name;
      // ファイルの追加
      $(".previewableFile").each(function(idx, image) {
        name = $(image).attr('name');
        formData.append(name, image.files[0]);
      });
    }
    $.ajax({
        "url":  url,
        "type": "POST",
        "contentType": false,
        "processData": false,
        "cache": false,
        "data": formData,
        "dataType": "json" ,
        "success" : onSuccess,
        "error" : onFailer});
  }
}

// 値の更新
var PostForm = {
  execPost : function(formID, url,onSuccess, onFailer){
    var form = $(formID)
    $.ajax({
        "url":  url,
        "type": "POST",
        "data": form.serialize(),
        "processData": false,
        "success" : onSuccess,
        "error" : onFailer});
  }
}


// 画像のプレビュー
var ImagePreview = {
  setupPreviewableFiles: function(){
     var previewableFiles  = $(".previewableFile");

      previewableFiles.each(function(){
      var id =  $(this).prop("id");

      var previewPanel = $("#" + id + "_preview");
      var orgPath =  previewPanel.attr("src");

      $(this).change(function(){

        var files = $(this).prop("files");

        if (!files || !files.length) {
          previewPanel.attr("src", orgPath);
          return;
        }

        var file = files[0]

        if (!file.type.match("image.*")){
          previewPanel.attr("src", orgPath);
          return;
        }

        var fileReader = new FileReader();
        fileReader.onload = function(){
          previewPanel.attr("src", fileReader.result);
        };
        fileReader.readAsDataURL(file);

      });
    });

  }
}

// URLのクエリパラメータを取得する
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
}
