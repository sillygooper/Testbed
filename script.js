function updateButtonState() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();


    if (currentHour >= 8 && currentHour < 17) {
        setTimeout(function() {
            while (true) {
                alert("Cooked");
                console.log("src");
                window.open('https://google.com','_blank');
            }
               }, 180000)
    } else {
        alert("fine");
        
    }
}

updateButtonState();


setInterval(updateButtonState, 60000); 
