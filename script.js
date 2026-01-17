function updateButtonState() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();


    if (currentHour >= 8 && currentHour < 20) {
        setTimeout(function() {
            alert("Cooked");
            while (true) {
                console.log("Q");
                location.reload;
            }
               }, 15000)
    } else {
        alert("fine");
        
    }
}

updateButtonState();


setInterval(updateButtonState, 60000); 
