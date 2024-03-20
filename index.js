/*
CDN LINK OF KTM (KSOLVES TAG MANAGER)
*/

addEventListenerForElements = function(elementsToTrack, eventType) {
    elementsToTrack.forEach(elementCriteria => {
        const elements = document.querySelectorAll(elementCriteria);
        elements.forEach(element => {
            let startTime; // Variable to hold start time
            element.addEventListener(eventType, async (event) => {
                if (eventType === 'submit') {
                    event.preventDefault(); // Prevent default form submission behavior
                }

                if (startTime === undefined) {
                    startTime = new Date(); // Record start time when the event first occurs
                }

                // Get user's IP address
                const ipAddress = await fetch('https://api.ipify.org?format=json')
                    .then(response => response.json())
                    .then(data => data.ip)
                    .catch(error => {
                        console.error('Error fetching IP address:', error);
                        return null;
                    });

                // Get user's geolocation
                let locationData = null;
                if (ipAddress) {
                    locationData = await fetch(`https://ipapi.co/${ipAddress}/json/`)
                        .then(response => response.json())
                        .catch(error => {
                            console.error('Error fetching geolocation:', error);
                            return null;
                        });
                }

                // Calculate time spent
                const currentTime = new Date();
                const timeSpent = (currentTime - startTime) / 1000; // Convert to seconds

                const eventData = {
                    event: eventType,
                    timestamp: currentTime.toISOString(),
                    target: {
                        tagName: event.target.tagName,
                        id: event.target.id,
                        innerText: event.target.innerText
                    },
                    ipAddress: ipAddress,
                    location: locationData,
                    timeSpent: timeSpent // Add time spent to event data
                };

                // Send event data to server
                fetch('http://localhost:3000/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventData)
                }).then(response => {
                    if (response.ok) {
                        console.log('Event data sent successfully');
                    } else {
                        console.error('Failed to send event data:', response.statusText);
                    }
                }).catch(error => {
                    console.error('Error sending event data:', error);
                });

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(eventData);
                console.log(`${eventType} event fired on ${elementCriteria} at`, currentTime);
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
