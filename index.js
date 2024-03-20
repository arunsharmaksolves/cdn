/*
 CDN FOR KSOLVES TAG MANAGER (KTM)

 This Code is designed to capture the events happening at client website. Currently this code is adding custom eventListners but in future we can add dynamicity through dashboard. So that client can add their own tags.
*/


document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded");

    // Function to check if an element matches the specified criteria
    function isElementToTrack(element, criteria) {
        return (
            element.tagName.toLowerCase() === criteria.toLowerCase() || // Check tag name
            element.id === criteria // Check HTML tag ID
        );
    }

    // Function to add event listener for specified elements
    window.addEventListenerForElements = function(elementsToTrack, eventType) {
    elementsToTrack.forEach(elementCriteria => {
        const elements = document.querySelectorAll(elementCriteria);
        elements.forEach(element => {
            element.addEventListener(eventType, (event) => {
                if (eventType === 'submit') {
                    event.preventDefault(); // Prevent default form submission behavior
                }
                const eventData = {
                    event: eventType,
                    timestamp: new Date().toISOString(),
                    target: {
                        tagName: event.target.tagName.toLowerCase(),
                        id: event.target.id,
                        innerText: event.target.innerText
                    }
                };

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(eventData);
                console.log(`${eventType} event fired on ${elementCriteria} at`, new Date());
            });
        });
    });
};

    // // Example usage
    // const buttonsToTrack = ['#addToCart', '#like']; // Client-specified button IDs
    // const formToTrack = ['#myForm'];

    // // Attach event listeners for specified buttons and form
    // addEventListenerForElements(buttonsToTrack, 'click');
    // addEventListenerForElements(formToTrack, 'submit');
});

