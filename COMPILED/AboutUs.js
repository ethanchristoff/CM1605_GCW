const studentDetails = {
    stu1: {
        name: "Mindiya",
        id: "S1",
        role: "1",
        email: "fgfdmindiyasgsfgs"
    },
    stu2: {
        name: "Ethan Christoff Perera ",
        id: "2331419",
        role: "22",
        email: "fgfethandsgsfgs"
    },
    stu3: {
        name: "Chirath Shamika Setunge",
        id: "2330910",
        role: "3",
        email: "fchirahtgfdsgsfgs"
    },
    stu4: {
        name: "Chanul",
        id: "S4",
        role: "4",
        email: "chanulgsfgs"
    },

    // Add details for other students similarly
};

// Function to update student details in the right container
function updateStudentDetails(studentId) {
    const details = studentDetails[studentId];
    if (details) {
        document.getElementById('student-image').src = `face.png`; // Set the correct image source
        document.getElementById('student-name').textContent = details.name;
        document.getElementById('student-id').textContent = `RGU ID: ${details.id}`;
        document.getElementById('student-role').textContent = `Student: ${details.role}`;
        document.getElementById('student-email').textContent = `email:${details.email}`;
        document.querySelector('.right').classList.add('active');
    }
}

// Function to reset right container to default view
function resetRightContainer() {
    document.querySelector('.right').classList.remove('active');
        document.getElementById('student-image').src = "AboutUs.png"; 
        document.getElementById('student-name').textContent = "";
        document.getElementById('student-id').textContent = "";
        document.getElementById('student-role').textContent = "";
        document.getElementById('student-email').textContent ="";
}

// Attach event listeners to each student element
const students = document.querySelectorAll('.student');
students.forEach(student => {
    student.addEventListener('mouseenter', function() {
        const studentId = this.getAttribute('data-id');
        updateStudentDetails(studentId);
    });
    student.addEventListener('mouseleave', function() {
        resetRightContainer();
    });
});
// Get references to the plus and minus buttons
const increaseBtn = document.querySelector('.zoom-btn.increase');
const decreaseBtn = document.querySelector('.zoom-btn.decrease');

// Get the container element where you want to change the font size
const aboutUsContainer = document.querySelector('.aboutUsContainer');

// Define initial font size
let currentFontSize = 16; // Default font size

// Function to increase font size
function increaseFontSize() {
    currentFontSize += 5;
    aboutUsContainer.style.fontSize = currentFontSize + 'px';
}

// Function to decrease font size
function decreaseFontSize() {
    if (currentFontSize > 5) { // Ensure font size doesn't go below 5px
        currentFontSize -= 5;
        aboutUsContainer.style.fontSize = currentFontSize + 'px';
    }
}

// Attach event listeners to the plus and minus buttons
increaseBtn.addEventListener('click', increaseFontSize);
decreaseBtn.addEventListener('click', decreaseFontSize);
