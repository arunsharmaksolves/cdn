addEventListenerForElements = function(elementsToTrack, eventType) {
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
                        tagName: event.target.tagName,
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

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded");

    // Function to check if an element matches the specified criteria
    function isElementToTrack(element, criteria) {
        return (
            element.tagName.toLowerCase() === criteria.toLowerCase() || // Check tag name
            element.id === criteria // Check HTML tag ID
        );
    }
});
