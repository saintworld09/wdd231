// Set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Display the last modified date
document.getElementById('lastModified').textContent = "Last Modified: " + document.lastModified;

// Array of courses
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: true }
];

// Display courses in the container
function displayCourses(filter) {
    const container = document.getElementById('course-list');
    container.innerHTML = ''; // Clear previous content

    // Filter courses based on the category
    const filteredCourses = courses.filter(course => filter === 'all' || course.subject === filter);

    // Display each course
    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = course.completed ? 'completed-course' : 'course';
        courseDiv.innerHTML = `
            <h3>${course.subject} ${course.number} - ${course.title}</h3>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Status:</strong> ${course.completed ? "Completed" : "In Progress"}</p>
        `;
        container.appendChild(courseDiv);
    });

    // Update total credits
    calculateTotalCredits(filteredCourses);
}

// Calculate and display total credits
function calculateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = `Total Credits: ${totalCredits}`;
}

// Initialize page with all courses displayed
window.onload = function() {
    displayCourses('all');
};
