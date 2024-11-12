// Set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Display the last modified date
document.getElementById('lastModified').textContent = "Last Modified: " + document.lastModified;

// Sample course array
const courses = [
    { name: "CSE 110", completed: true, category: "CSE" },
    { name: "WDD 130", completed: false, category: "WDD" },
    { name: "CSE 210", completed: true, category: "CSE" },
    { name: "WDD 131", completed: false, category: "WDD" },
];

// Display courses in the container
function displayCourses(filter) {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    const filteredCourses = courses.filter(course =>
        filter === 'all' ? true : course.category === filter
    );

    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.className = course.completed ? 'completed-course' : 'course';
        courseDiv.textContent = course.name;
        container.appendChild(courseDiv);
    });
}

// Filter courses on page load
window.onload = function() {
    displayCourses('all');
}
