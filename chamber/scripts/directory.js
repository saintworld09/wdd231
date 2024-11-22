// Fetch and Display Member Data
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        // Display members in default grid view
        displayMembers(members, 'grid');
        
        // Add toggle functionality to switch between grid and list views
        addToggleFunctionality(members);
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

// Get Membership Label (based on membership level)
function getMembershipLabel(level) {
    switch (level) {
        case 1: return 'Basic';
        case 2: return 'Standard';
        case 3: return 'Premium';
        default: return 'Unknown';
    }
}

// Add View Toggle Functionality (Grid and List Views)
function addToggleFunctionality(members) {
    const gridButton = document.getElementById('grid-view-btn');
    const listButton = document.getElementById('list-view-btn');

    // Grid view button event listener
    gridButton.addEventListener('click', () => {
        displayMembers(members, 'grid'); // Display in grid view
        setActiveViewButton(gridButton, listButton); // Set active button state
    });

    // List view button event listener
    listButton.addEventListener('click', () => {
        displayMembers(members, 'list'); // Display in list view
        setActiveViewButton(listButton, gridButton); // Set active button state
    });
}

// Set active button for view toggle (highlight the selected view)
function setActiveViewButton(activeButton, inactiveButton) {
    activeButton.classList.add('active');
    inactiveButton.classList.remove('active');
}

// Display the current year dynamically
document.getElementById("current-year").textContent = new Date().getFullYear();

// Display the last modified date dynamically
document.getElementById("last-modified").textContent = document.lastModified;

// Display the current date dynamically
const currentDate = new Date();
document.getElementById("current-date").textContent = currentDate.toLocaleDateString();

// Initialize Functions
fetchMembers();

// Footer Information
function displayFooterInfo() {
    const footerInfo = document.getElementById('footer-info');
    footerInfo.innerHTML = `
        <p>&copy; ${new Date().getFullYear()} Chamber of Commerce</p>
        <p>Last updated: ${document.lastModified}</p>
        <p>Current date: ${new Date().toLocaleDateString()}</p>
    `;
}

displayFooterInfo();
