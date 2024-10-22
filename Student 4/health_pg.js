var navLinks = document.getElementById("navLinks");

function hideMenu(){
    navLinks.style.right ="-200px";
}

function showMenu(){
    navLinks.style.right ="0";
}

const questions = [
    {
        question: "What is the average body temperature of a healthy human?",
        answers: [
            {text: "32°C", correct: false},
            {text: "37°C", correct: true},
            {text: "40°C", correct: false},
            {text: "45°C", correct: false}
        ]
    },
    {
        question: "Which vitamin is essential for good vision?",
        answers: [
            {text: "Vitamin A", correct: true},
            {text: "Vitamin C", correct: false},
            {text: "Vitamin D", correct: false},
            {text: "Vitamin K", correct: false}
        ]
    },
    {
        question: "What is the main function of the red blood cells in the body?",
        answers: [
            {text: "Fight infection", correct: false},
            {text: "Produce insulin", correct: false},
            {text: "Carry oxygen", correct: true},
            {text: "Help with digestion", correct: false}
        ]
    },
    {
        question: "What is the largest organ in the human body?",
        answers: [
            {text: "Liver", correct: false},
            {text: "Lungs", correct: false},
            {text: "Heart", correct: false},
            {text: "Skin", correct: true}
        ]
    },
    {
        question: "What is the primary function of the kidneys?",
        answers: [
            {text: "Regulate body temperature", correct: false},
            {text: "Control blood pressure", correct: false},
            {text: "Filter waste from the blood", correct: true},
            {text: "Produce hormones", correct: false}
        ]
    }
];
/*
Number of questions vary on the length of the array mentioned above.
To change the number of answers per question, simply add another placeholder in the quiz.html file.
The changes aren't dynamic so each answer needs a placeholder to be put down.
*/
const questionElements = document.getElementById("question_btns");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("nxtbtn");

let currentQidx = 0;
let score = 0;

function startQuiz(){
    currentQidx = 0;
    score = 0;
    nextBtn.innerHTML= "Next";
    showQuestion()
}

function validation(x){
    for (let i=0;i<=x.length;i++){
        if (i in x){
            return true;
        }else{
            return false;
        }
    }
}

function showQuestion(){
    resetCSTate();
    let randIdx = Math.floor(Math.random()*questions.length);
    let currentQ = questions[currentQidx];//replace with currentQIdx to make the order sequential
    let questionsNo = currentQidx+1;
    questionElements.innerHTML=questionsNo+". "+currentQ.question;
    currentQ.answers.forEach(answer=>{
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answerBtn.appendChild(btn);
        if(answer.correct){
            btn.dataset.correct=answer.correct;
        }
        btn.addEventListener("click",selans);
    });
}

function resetCSTate(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }
}

function selans(e){
    const selBtn=e.target;
    const isCorrect=selBtn.dataset.correct==="true";
    if(isCorrect){
        selBtn.classList.add("correct");
        score+=2;
    }
    else{
        selBtn.classList.add("incorrect");
        score--;
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextBtn.style.display="block";
}

function showScore(){
    resetCSTate();
    if(score==0){
        questionElements.innerHTML = "You didn't score any points, try again next time";
    }else{
        questionElements.innerHTML = 'You have earned: '+score+' points out of: '+questions.length*2+', please claim the points in your next purchase!';
        sessionStorage.setItem('score',score);
    }
    nextBtn.innerHTML="play again?";
    nextBtn.style.display="block";
}
    
function handleNxtBtn(){
    currentQidx++;
    if(currentQidx<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQidx<questions.length){
        handleNxtBtn();
    }
    else{
        startQuiz();
    }
});

startQuiz();

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

function quiz_details_required() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var contact = document.getElementById("contact").value;

    if (name.trim() == "" || email.trim() == "" || age.trim() == "" || contact.trim() == "") {
        alert("Please fill in all the required fields.");
    }else{
        alert("Value submitted")
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

    let incorrect_string = "";

    for (let i = 0; i <= states.length; i++) {
        switch(i){
            case 0:
                if(states[0]!=true){
                    incorrect_string+="\nYou got question 1 wrong!\n";
                } 
                break

            case 1:
                if(states[1]!=true){
                    incorrect_string+="\nYou got question 2 wrong!\n";
                } 
                break

            case 2:
                if(states[2]!=true){
                    incorrect_string+="\nYou got question 3 wrong!\n";
                } 
                break
                
            case 3:
                if(states[3]!=true){
                    incorrect_string+="\nYou got question 4 wrong!\n";
                } 
                break
                
            case 4:
                if(states[4]!=true){
                    incorrect_string+="\nYou got question 5 wrong!\n";
                }
                break
        }      
    }
    if (incorrect_string===""){
        alert("You got all the questions correct!")
    } else{
        alert(incorrect_string)
    }
}

function setName(){
    let name = document.getElementById("introduction-text").innerHTML;
    
}


// * XML AND HTML

function ApplyColors() {
    var navbar = document.getElementById("navbar");
    var bgcolormenu = document.getElementById("navbar_color");
    var textcol = document.getElementById("navbar_Textcolor");

    var bgcolor = bgcolormenu.value;
    var textcolor = textcol.value;
    var body = document.body;
    body.style.backgroundColor = bgcolor;
    body.style.color = textcolor;
}


