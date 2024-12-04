// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Extract form data
const firstName = urlParams.get("firstName") || "N/A";
const lastName = urlParams.get("lastName") || "N/A";
const email = urlParams.get("email") || "N/A";
const phone = urlParams.get("phone") || "N/A";
const organization = urlParams.get("organization") || "N/A";
const timestamp = urlParams.get("timestamp") || new Date().toLocaleString(); // Default to current date

// Update the user details on the page
const userDetails = document.getElementById("user-details");

userDetails.innerHTML = `
    <li><strong>First Name:</strong> ${firstName}</li>
    <li><strong>Last Name:</strong> ${lastName}</li>
    <li><strong>Email Address:</strong> ${email}</li>
    <li><strong>Mobile Phone:</strong> ${phone}</li>
    <li><strong>Business/Organization Name:</strong> ${organization}</li>
`;

// Update timestamp on the page
document.getElementById("timestamp").textContent = timestamp;

// Dynamic year and last modified
document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;
// Display the current date dynamically
document.getElementById("current-date").textContent = `Today's Date: ${new Date().toLocaleDateString()}`;

displayFooterInfo();