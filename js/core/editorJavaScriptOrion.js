/**
 Copyright 2014 Jonah Graham (jonah@kichwacoders.com)

 This Source Code is subject to the terms of the Mozilla Public
 License, v2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
 
 ------------------------------------------------------------------
  Orion JavaScript editor
 ------------------------------------------------------------------
**/
"use strict";
(function(){
  var orionEditor = null;
  var preloadedContent = null;

  function init() {
    $('<div id="divcode" style="width:100%;height:100%;display:none"><pre class="orioneditor" data-editor-lang="js" style="height:95%"></pre></div>').appendTo(".editor--code .editor__canvas");
    require(["orion/editor/edit"], function(edit) {

      orionEditor = edit({className: "orioneditor", lang: "javascript"})[0];
      orionEditor.setText(preloadedContent);

      // all set up, ready to show the code frame
      $("#divcode").show();
    });
  }

  function getCode() {
    return orionEditor.getText();
  }
  
  function setCode(code) {
    if (orionEditor == null)
      preloadedContent = code;
    else
      orionEditor.setText(code);
  }
  
  Espruino.Core.EditorJavaScript = {
    init : init,
    getCode : getCode,
    setCode : setCode,
  };
}());