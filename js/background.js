chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('main.html', {
    id:"espruino_mainwindow", 
    width: 1024, 
    height: 600, 
    singleton: true,
    frame: 'none'
  }, function(win) {
    if (launchData.id) {
      // We are called to handle a URL that matches one of our url_handlers.
      if (launchData.id === 'espruino_code') {
       if (win.contentWindow.Espruino!==undefined && win.contentWindow.Espruino.initialised==true) {
          win.contentWindow.Espruino.Plugins.URLHandler.handle(launchData.url);
        } else {
          // timeout required for first launch for some reason
          win.contentWindow.setTimeout(function() {            
              win.contentWindow.Espruino.Plugins.URLHandler.handle(launchData.url);
          }, 2000);
        }
      } else {
        console.error("Unexpected URL handler ID: " + launchData.id);
      }
    }
    
  });
  
  
 
});