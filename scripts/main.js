document.addEventListener("DOMContentLoaded", function () {
    // Sample course list array with course details (name, category, completion status, credits)
    const courseList = [
        { id: 1, name: "CSE 110", category: "CSE", completed: true, credits: 3 },
        { id: 2, name: "WDD 130", category: "WDD", completed: false, credits: 4 },
        { id: 3, name: "CSE 111", category: "CSE", completed: false, credits: 3 },
        { id: 4, name: "CSE 210", category: "CSE", completed: true, credits: 4 },
        { id: 5, name: "WDD 131", category: "WDD", completed: true, credits: 3 },
        { id: 6, name: "WDD 231", category: "WDD", completed: false, credits: 4 }
    ];

    // Function to update the course selection count and dynamically display courses
    function displayCourses(courses) {
        const courseContainer = document.getElementById('course-cards');
        courseContainer.innerHTML = ''; // Clear the existing course list

        // Dynamically create course cards
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            if (course.completed) {
                courseCard.classList.add('completed'); // Apply different style if the course is completed
            }

            courseCard.innerHTML = `
                <h3>${course.name}</h3>
            `;
            courseContainer.appendChild(courseCard);
        });

        // Calculate total credits dynamically
        const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
        document.getElementById('total-credits').innerText = `Total Credits: ${totalCredits}`;
    }

    // Display all courses by default
    displayCourses(courseList);

    // Helper function to handle active class toggle
    function handleActiveButton(button) {
        document.querySelectorAll('.course-filter button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }

    // Event listeners for filter buttons
    document.getElementById('all-courses-btn').addEventListener('click', (event) => {
        displayCourses(courseList); // Display all courses
        handleActiveButton(event.target); // Set active state on clicked button
    });

    document.getElementById('wdd-courses-btn').addEventListener('click', (event) => {
        const wddCourses = courseList.filter(course => course.category === 'WDD');
        displayCourses(wddCourses); // Display only WDD courses
        handleActiveButton(event.target); // Set active state on clicked button
    });

    document.getElementById('cse-courses-btn').addEventListener('click', (event) => {
        const cseCourses = courseList.filter(course => course.category === 'CSE');
        displayCourses(cseCourses); // Display only CSE courses
        handleActiveButton(event.target); // Set active state on clicked button
    });

    // Display the current year
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Display the last modified date
    document.getElementById("last-modified").textContent = document.lastModified;

    // Display the current date
    const currentDate = new Date();
    document.getElementById("current-date").textContent = currentDate.toLocaleDateString();

    // Mobile Menu Toggle
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');
    
    if(menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('open'); // Toggle the mobile menu visibility
        });
    }
});
