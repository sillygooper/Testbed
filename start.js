const button = document.getElementById("myButton");
const HTML = `
<!DOCTYPE html>
<html style="width:100%;height:100%;background-color:black;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/bootstrap.js"></script>
    <script src = "https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/script.js"
    <script type="text/javascript">
      "use strict";
      window.addEventListener("load", function() {
        var probe = document.createElement("canvas");
        var webgl = null;
        try {
          webgl = probe.getContext("webgl2") || probe.getContext("webgl");
        } catch(error) {
          webgl = null;
        }

        if(!webgl) {
          alert("WebGL environment failure! Please enable hardware acceleration.");
          return;
        }

        var relayId = Math.floor(Math.random() * 3);
        window.eaglercraftXOpts = {
          demoMode: false,
          container: "game_frame",
          assetsURI: "https://www.dropbox.com/scl/fi/g9crdpigxvqmj1lvmtzip/assets.epw?rlkey=bttj7s3qia9rz0sqr4jimesan&st=6v4dlr2n&dl=1",
          worldsDB: "worlds",
          servers: [],
          relays: [
            { addr: "wss://relay.deev.is/", comment: "lax1dude relay #1", primary: relayId == 0 },
            { addr: "wss://relay.lax1dude.net/", comment: "lax1dude relay #2", primary: relayId == 1 },
            { addr: "wss://relay.shhnowisnottheti.me/", comment: "ayunami relay #1", primary: relayId == 2 }
          ]
        };

        var q = window.location.search;
        if((typeof q === "string") && q[0] === "?" && (typeof window.URLSearchParams !== "undefined")) {
          q = new window.URLSearchParams(q);
          var s = q.get("server");
          if(s) window.eaglercraftXOpts.joinServer = s;
        }

        if(typeof window.main !== "function") {
          alert("Bootstrap failed to initialize core script variables.");
          return;
        }

        window.main();
      });
    </script>
  </head>
  <body style="margin:0px;width:100%;height:100%;overflow:hidden;background-color:black;" id="game_frame"></body>
</html>
`;

button.addEventListener("click", function() {
  const gameWindow = window.open("", "_blank");
  if (gameWindow) {
    gameWindow.document.open("text/html", "replace");
    gameWindow.document.write(HTML);
    gameWindow.document.close();
  } else {
    alert("Popup blocked! Please allow popups to open the game context layout.");
  }
});
