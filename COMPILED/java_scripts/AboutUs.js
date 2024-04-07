document.addEventListener('DOMContentLoaded', function() {
    const studentDetails = {
        stu1: {
            name: "Mindiya De Zoysa",
            id: "S1",
            role: "1",
            email: "m.agampodi@rgu.ac.uk",
            image: "style_sheets/images/Student_1.jpeg"
        },
        stu2: {
            name: "Ethan Christoff Perera ",
            id: "2331419",
            role: "2",
            email: "e.modarage@rgu.ac.uk",
            image: "style_sheets/images/Student_2.jpeg"
        },
        stu3: {
            name: "Chirath Shamika Setunge",
            id: "2330910",
            role: "3",
            email: "c.setunge-mudalige-don@rgu.ac.uk",
            image: "style_sheets/images/Student_3.jpeg"
        },
        stu4: {
            name: "Chanul Vitharana",
            id: "2330948",
            role: "4",
            email: "c.vitharana@rgu.ac.uk",
            image: "style_sheets/images/Student_4.jpeg"
        },
    };

    // Function to update student details in the right container
    function updateStudentDetails(studentId) {
        const details = studentDetails[studentId];
        if (details) {
            document.getElementById('student-image').src = details.image; 
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
        document.getElementById('student-image').src = "style_sheets/images/AboutUs.png"; 
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

    // Zoom-in and zoom-out functionality
    const increaseBtn = document.querySelector('.zoom-btn.increase');
    const decreaseBtn = document.querySelector('.zoom-btn.decrease');
    const aboutUsContainer = document.querySelector('.aboutUsContainer');
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

    // Attached event listeners to the plus and minus buttons
    increaseBtn.addEventListener('click', increaseFontSize);
    decreaseBtn.addEventListener('click', decreaseFontSize);
});

            // Attach an event handler for the 'submit' event on the newsletter form.
            document.getElementById('newsletterForm').onsubmit = function(event) {
                // Prevent the default form submission behavior.
                event.preventDefault();
    
                var name = document.getElementById('name').value;
                var email = document.getElementById('email').value;
    
                // Define a regex pattern for basic email validation.
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
                // Check if the name and email fields are filled and if the email is valid.
                if(name && email && emailRegex.test(email)) {
                    alert(`Dear ${name}, you have successfully subscribed for our personalized newsletter.`);
                } else {
                    alert('Please ensure all fields are filled out correctly.');
                }
            };
