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
  var editor = null;
  var preloadedContent = null;

  function init() {
    $('<div id="divcode" style="width:100%;height:100%;display:none"><pre class="orioneditor" data-editor-lang="js" style="height:95%"></pre></div>').appendTo(".editor--code .editor__canvas");
    require(["orion/editor/edit", "orion/editor/templates"], function(edit, templates) {

      editor = edit({className: "orioneditor", lang: "javascript"})[0];
      editor.setText(preloadedContent);
      

      var temps = [
      {
        prefix: "SELECT", //$NON-NLS-0$
        description: "Select table", //$NON-NLS-0$
        template: "SELECT ${column} FROM ${table_name};" //$NON-NLS-1$ //$NON-NLS-0$
      },
      {
        prefix: "INSERT INTO", //$NON-NLS-0$
        description: "Insert in table", //$NON-NLS-0$
        template: "INSERT INTO ${table_name} VALUES (${values});" //$NON-NLS-0$
      }
      ];
      var keywords = [
        "SELECT", //$NON-NLS-0$
        "WHERE", //$NON-NLS-0$
        "WHEN", //$NON-NLS-0$
        "DELETE" //$NON-NLS-0$
      ];
      
      var contentAssist = editor.getContentAssist();
      contentAssist.setProviders([new templates.TemplateContentAssist(keywords, temps)]);

      // all set up, ready to show the code frame
      $("#divcode").show();
    });
  }

  function getCode() {
    return editor.getText();
  }
  
  function setCode(code) {
    if (editor == null)
      preloadedContent = code;
    else
      editor.setText(code);
  }
  
  Espruino.Core.EditorJavaScript = {
    init : init,
    getCode : getCode,
    setCode : setCode,
  };
}());