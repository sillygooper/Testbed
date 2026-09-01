const button = document.getElementById("myButton");

async function downloadEPW() {
    const urls = [
        "https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/assets1.epw",
        "https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/assets2.epw"
    ];

    const parts = await Promise.all(
        urls.map(async (url) => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to download ${url}: ${response.status}`);
            }

            return new Uint8Array(await response.arrayBuffer());
        })
    );

    const totalSize = parts.reduce(
        (sum, part) => sum + part.length,
        0
    );

    const combined = new Uint8Array(totalSize);

    let offset = 0;

    for (const part of parts) {
        combined.set(part, offset);
        offset += part.length;
    }

    return combined;
}

button.addEventListener("click", async function() {

    // Open the window immediately so the popup isn't blocked
    const gameWindow = window.open("", "_blank");

    if (!gameWindow) {
        alert("Popup blocked! Please allow popups to open the game context layout.");
        return;
    }

    try {
        gameWindow.document.write(`
            <html>
            <body style="background:black;color:white;font-family:sans-serif;text-align:center;">
                <h2>Downloading assets...</h2>
                <p>Please wait...</p>
            </body>
            </html>
        `);

        const epwData = await downloadEPW();

        // Turn the combined bytes back into a file-like URL
        const epwBlob = new Blob([epwData], {
            type: "application/octet-stream"
        });

        const epwURL = URL.createObjectURL(epwBlob);

        const HTML = `
<!DOCTYPE html>
<html style="width:100%;height:100%;background-color:black;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">

  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/bootstrap.js"></script>

  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/script.js"></script>

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

        assetsURI: "${epwURL}",

        worldsDB: "worlds",
        servers: [],

        relays: [
          {
            addr: "wss://relay.deev.is/",
            comment: "lax1dude relay #1",
            primary: relayId == 0
          },
          {
            addr: "wss://relay.lax1dude.net/",
            comment: "lax1dude relay #2",
            primary: relayId == 1
          },
          {
            addr: "wss://relay.shhnowisnottheti.me/",
            comment: "ayunami relay #1",
            primary: relayId == 2
          }
        ]
      };

      if(typeof window.main !== "function") {
        alert("Bootstrap failed to initialize core script variables.");
        return;
      }

      window.main();
    });
  </script>
</head>

<body
  style="margin:0;width:100%;height:100%;overflow:hidden;background-color:black;"
  id="game_frame">
</body>
</html>
`;

        gameWindow.document.open();
        gameWindow.document.write(HTML);
        gameWindow.document.close();

    } catch (error) {
        console.error(error);

        gameWindow.close();

        alert("Failed to download assets: " + error.message);
    }
});
