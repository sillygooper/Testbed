function updateButtonState() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();


    if (currentHour >= 8 && currentHour < 17) {
        setTimeout(function() {
            window.open('https://google.com','_blank');
            while (true) {
                console.log("Q");
            }
               }, 120000)
    } 
}

updateButtonState();


setInterval(updateButtonState, 60000); 
