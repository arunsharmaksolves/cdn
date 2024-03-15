/*
 CDN FOR KSOLVES TAG MANAGER (KTM)

 This Code is designed to capture the events happening at client website. Currently this code is adding custom eventListners but in future we can add dynamicity through dashboard. So that client can add their own tags.
*/


document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded");
    const eventsToTrack = ['click', 'mouseover', 'mouseout', 'keydown', 'submit']; 

    // Attach event listeners for all specified event types
    eventsToTrack.forEach(eventType => {
        document.addEventListener(eventType, (event) => {
            if(eventType == "click"){
                if(event.target.innerText === "Add To cart"){
                    console.log("Add to cart Event fired ",event, new Date());
                }
            }
            if(eventType == "submit"){
                event.preventDefault();
                console.log("Submit Event fired at",event, new Date());
            }
            if (eventType === "mouseover") {
                if (event.target.tagName.toLowerCase() === 'h1' && event.target.innerText === 'Hello World') {
                    console.log("Mouseover Event fired on 'Hello World' at", new Date());
                }
            }
        });
    });
});