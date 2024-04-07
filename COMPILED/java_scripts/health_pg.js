// Made by Ethan Perera (Student 2)
var navLinks = document.getElementById("navLinks");

// Functions that show the menu icon in the mobile version of the website
function hideMenu(){
    navLinks.style.right ="-200px";
}

function showMenu(){
    navLinks.style.right ="0";
}

let score = 0;

var temp_element// Caches the initial element here so it replaces the value onBlur (as in when it's no longer in focus)

function clearPrompt(element) {
    temp_element = element.value;// Passes the value from the html segement to the script and is then stashed
    element.value = "";
}

function returnPrompt(element) {
    if (element.value == "") { 
        element.value = temp_element;// The text value taken in from the html input is then referred to again here
    }
}

function feedback_required(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var contact = document.getElementById("contact").value;
    var feedback = document.getElementById("Feedback").value;
    var rating = document.getElementById("rating").value;

    if (name.trim() == "" || email.trim() == "" || contact.trim() == "" || feedback.trim() == "" || rating == ""){
        alert("Please fill in all the required fields");
    }else if (isNaN(age.trim()) || age.trim() == "") {
        alert("Please enter a valid age.");
    }
    alert("Your name is: "+name+"\nYour email is:"+email+"\nYour age is:"+age+"\nYour contact details are:"+contact);
}

// Navbar sticky function

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("navbar").classList.add("sticky");
    } else {
        document.getElementById("navbar").classList.remove("sticky");
    }
}

// Quiz Java script

function quiz_submit(){

    var q1 = document.getElementById("first_q");
    var q2 = document.getElementById("second_q").value;
    var q3 = document.getElementById("third_q").value;
    var q4 = document.getElementById("fourth_q").value;
    var q5 = document.getElementById("fifth_q").value;

    let states = [false,false,false,false,false];

    switch (q1.valueAsNumber){
        case 37:
            score+=2;
            states[0]=true;
            break;

        case "":
            break
        
        default:
            score--;
    }

    switch (q2.trim().toLowerCase()){
        case "vitamin a":
            score+=2;
            states[1]=true;
            break;

        case "":
            break            

        default:
            score--;
    }

    switch (q3.trim().toLowerCase()){
        case "carry oxygen":
            score+=2;
            states[2]=true;
            break;

        case "":
            break

        default:
            score--;
    }

    switch (q4.trim().toLowerCase()){
        case "skin":
            score+=2;
            states[3]=true;
            break;

        case "":
            break

        default:
            score--;
    }

    switch (q5.trim().toLowerCase()){
        case "filter waste from the blood":
            score+=2;
            states[4]=true;
            break;

        case "":
            break

        default:
            score--;
    }

    sessionStorage.setItem('score',score);
    
    if (score<=0){
        alert("You have scored: 0 points");
    } else{
        alert("You have scored: "+score);
    }

    var incorrect_string = "";

    for (let i = 0; i <= states.length; i++) {
        switch(i){
            case 0:
                if(states[0]!=true){
                    incorrect_string+="You got question 1 wrong!<br>";
                } 
                break

            case 1:
                if(states[1]!=true){
                    incorrect_string+="You got question 2 wrong!<br>";
                } 
                break

            case 2:
                if(states[2]!=true){
                    incorrect_string+="You got question 3 wrong!<br>";
                } 
                break
                
            case 3:
                if(states[3]!=true){
                    incorrect_string+="You got question 4 wrong!<br>";
                } 
                break
                
            case 4:
                if(states[4]!=true){
                    incorrect_string+="You got question 5 wrong!<br>";
                }
                break
        }      
    }
    if (incorrect_string!="")
        document.getElementById("popupText").innerHTML = incorrect_string;
    else
        document.getElementById("popupText").innerHTML = "you got all the questions right!"
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// Show the popup with user details
function showPopup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var contact = document.getElementById("contact").value;

    if (name.trim() == "" || email.trim() == "" || age.trim() == "" || contact.trim() == ""){
        var popupText = "Ensure that you fill all the fields"
    }else {
        var popupText = "Name: " + name + "<br>Email: " + email + "<br>Age: " + age + "<br>Contact: " + contact;
    }
    document.getElementById("popupText").innerHTML = popupText;
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// Close the popup
function closePopup() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

    document.body.style.overflow = ""; // Enable scrolling
}