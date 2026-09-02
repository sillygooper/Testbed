const button = document.getElementById("myButton");

const urls = [
		"https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/assets1.epw",
		"https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/assets2.epw"
];

async function downloadEPW() {
		const parts = await Promise.all(
				urls.map(async (url) => {
						const response = await fetch(url, {
								cache: "no-cache"
						});

						if (!response.ok) {
								throw new Error(
										`Failed to download ${url}: ${response.status}`
								);
						}

						return new Uint8Array(
								await response.arrayBuffer()
						);
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

button.addEventListener("click", async function () {
		const gameWindow = window.open("", "_blank");

		if (!gameWindow) {
				alert(
						"Popup blocked! Please allow popups to open the game."
				);
				return;
		}

		try {
				gameWindow.document.open();

				gameWindow.document.write(`
						<html>
						<body style="
								margin:0;
								background:black;
								color:white;
								font-family:sans-serif;
								display:flex;
								align-items:center;
								justify-content:center;
								height:100vh;
						">
								<div style="text-align:center">
										<h2>Downloading assets...</h2>
										<p>Please wait...</p>
								</div>
						</body>
						</html>
				`);

				gameWindow.document.close();

				const epwData = await downloadEPW();

				const epwBlob = new Blob(
						[epwData],
						{
								type: "application/octet-stream"
						}
				);

				const epwURL =
						URL.createObjectURL(epwBlob);

				const HTML = `
<!DOCTYPE html>
<html style="
		width:100%;
		height:100%;
		background-color:black;
">

<head>

<meta charset="UTF-8">

<meta
		name="viewport"
		content="
				width=device-width,
				initial-scale=1.0,
				minimum-scale=1.0,
				maximum-scale=1.0
		"
>

<script
		src="https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/bootstrap.js"
></script>
<script
		src="https://cdn.jsdelivr.net/gh/sillygooper/Testbed@main/script.js"
></script>

<script>
"use strict";

window.addEventListener("load", function() {

		var probe =
				document.createElement("canvas");

		var webgl = null;

		try {
				webgl =
						probe.getContext("webgl2") ||
						probe.getContext("webgl");
		} catch(error) {
				webgl = null;
		}

		if (!webgl) {
				alert(
						"WebGL environment failure! " +
						"Please enable hardware acceleration."
				);
				return;
		}

		var relayId =
				Math.floor(Math.random() * 3);

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

		if (typeof window.main !== "function") {
				alert(
						"Bootstrap failed to initialize core script variables."
				);
				return;
		}

		window.main();
});

<\/script>

</head>

<body
		id="game_frame"
		style="
				margin:0;
				width:100%;
				height:100%;
				overflow:hidden;
				background-color:black;
		"
></body>

</html>
`;

				gameWindow.document.open();
				gameWindow.document.write(HTML);
				gameWindow.document.close();

				setTimeout(function() {
						URL.revokeObjectURL(epwURL);
				}, 120000);

		} catch (error) {
				console.error(error);

				try {
						gameWindow.close();
				} catch {}

				alert(
						"Failed to download assets: " +
						error.message
				);
		}
});
