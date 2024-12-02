// Fetch and Display Member Data
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        // Display members in default grid view
        displayMembers(members, 'grid');

        // Add toggle functionality to switch between grid and list views
        addToggleFunctionality(members);

        // Display spotlights for gold and silver members
        displaySpotlights(members);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

// Display Members in Grid or List View
function displayMembers(members, viewType) {
    const container = document.getElementById('directory-container');
    container.innerHTML = ''; // Clear current content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = viewType === 'grid' ? 'directory-item grid-card' : 'directory-item list-item';

        // Add HTML content for each member
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" onerror="this.onerror=null;this.src='images/fallback.jpg';">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="membership-level">Membership Level: ${getMembershipLabel(member.membershipLevel)}</p>
        `;

        // Append the member card to the container
        container.appendChild(memberCard);
    });
}

// Add View Toggle Functionality (Grid and List Views)
function addToggleFunctionality(members) {
    const gridButton = document.getElementById('grid-view-btn');
    const listButton = document.getElementById('list-view-btn');

    gridButton.addEventListener('click', () => {
        displayMembers(members, 'grid');
        setActiveViewButton(gridButton, listButton);
    });

    listButton.addEventListener('click', () => {
        displayMembers(members, 'list');
        setActiveViewButton(listButton, gridButton);
    });
}

// Set Active Button for View Toggle
function setActiveViewButton(activeButton, inactiveButton) {
    activeButton.classList.add('active');
    inactiveButton.classList.remove('active');
}

// Get Membership Label (Based on Membership Level)
function getMembershipLabel(level) {
    switch (level) {
        case 1: return 'Basic';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

let membersData = []; // Store fetched member data for reuse

// Fetch members and store the data
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); // Ensure the path is correct
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        membersData = await response.json(); // Save members data to a global variable

        console.log("Fetched Members:", membersData); // Debugging log

        // Call both Spotlight and Directory functions
        displaySpotlights(membersData);
        displayDirectory(membersData);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

// Display the Member Spotlight
function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    if (!spotlightContainer) return; // If no spotlight section, skip this step

    const spotlightMembers = members.filter(member => member.membershipLevel >= 2)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3); // Select 2-3 random gold/silver members

    spotlightContainer.innerHTML = ''; // Clear existing content

    spotlightMembers.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.className = 'spotlight-card';

        spotlightCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" onerror="this.onerror=null;this.src='images/fallback.jpg';">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        spotlightContainer.appendChild(spotlightCard);
    });
}

// Display the Member Directory
function displayDirectory(members) {
    const directoryContainer = document.getElementById('directory-container');
    if (!directoryContainer) return; // If no directory section, skip this step

    directoryContainer.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const directoryCard = document.createElement('div');
        directoryCard.className = 'directory-card';

        directoryCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" onerror="this.onerror=null;this.src='images/fallback.jpg';">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        directoryContainer.appendChild(directoryCard);
    });
}

// Call the fetch function
fetchMembers();




// Fetch and Display Weather Data
async function fetchWeather() {
    const apiKey = "1bd0c56b0265fa1adebbe14b3f815ac7"; 
    const city = "Lagos";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        const temperature = Math.round(weatherData.main.temp);
        const weatherDescription = weatherData.weather
            .map(event => capitalizeWords(event.description))
            .join(", ");

        document.getElementById("temperature").textContent = `Current Temperature: ${temperature}°C`;
        document.getElementById("description").textContent = `Conditions: ${weatherDescription}`;

        await fetchForecast(city, apiKey);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Fetch 3-Day Weather Forecast
async function fetchForecast(city, apiKey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(forecastUrl);
        const forecastData = await response.json();
        const forecastContainer = document.getElementById("forecast");

        forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

        for (let i = 0; i < 24 * 3; i += 8) {
            const day = forecastData.list[i];
            const date = new Date(day.dt * 1000).toLocaleDateString();
            const temp = Math.round(day.main.temp);
            const desc = capitalizeWords(day.weather[0].description);

            forecastContainer.innerHTML += `<p>${date}: ${temp}°C - ${desc}</p>`;
        }
    } catch (error) {
        console.error("Error fetching forecast data:", error);
    }
}

// Capitalize Words
function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Display Footer Information
function displayFooterInfo() {
    const footerInfo = document.getElementById('footer-info');
    footerInfo.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} Chamber of Commerce</p>
        <p>Last updated: ${document.lastModified}</p>
        <p>Current date: ${new Date().toLocaleDateString()}</p>
    `;
}

// Initialize functions
fetchWeather();
fetchMembers();

// Dynamic year and last modified
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;
// Display the current date dynamically
document.getElementById("current-date").textContent = `Today's Date: ${new Date().toLocaleDateString()}`;

displayFooterInfo();