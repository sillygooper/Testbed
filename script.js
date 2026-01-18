function updateButtonState() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();


    if (currentHour >= 8 && currentHour < 23) {
        setTimeout(function() {
            new.window('https://google.com','_blank')
            alert("Cooked");
            while (true) {
                console.log("Q");
            }
               }, 15000)
    } else {
        alert("fine");
        
    }
}

updateButtonState();


setInterval(updateButtonState, 60000); 
