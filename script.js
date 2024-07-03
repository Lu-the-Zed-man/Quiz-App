//Define and set the questions
const questions = [
    {
        question: "Which one of the following is Zambia's local currency?",
        answers: [
            { text: "Euro." , correct: false},
            { text: "Pula." , correct: false},
            { text: "Dollar." , correct: false},
            { text: "Kwacha." , correct: true},
        ]
    },
    {
        question: "When did Zambia gain it's independence?",
        answers: [
            { text: "24 Ocotober 1994.", correct: false},
            { text: "24 November 1964.", correct: false},
            { text: "24 Ocotober 1964.", correct: true},
            { text: "25 Ocotober 1964.", correct: false},
        ]
    },
    {
        question: "What is the capital city of Zambia?",
        answers: [
            { text: "Lusaka.", correct: true},
            { text: "Kabwe.", correct: false},
            { text: "Livingstone.", correct: false},
            { text: "Ndola capital.", correct: false},
        ]
    },
    {
        question: "who was Zambia's first president?",
        answers: [
            { text: "Edgar Lungu.", correct: false},
            { text: "Kenneth Kaunda.", correct: true},
            { text: "Hakainde Hichilema.", correct: false},
            { text: "Fedrick Chiluba.", correct: false},
        ]
    },
    {
        question: "Where is the Victoria Falls located?",
        answers: [
            { text: "Lusaka, Zambia.", correct: false},
            { text: "Kabwe, Zambia.", correct: false},
            { text: "Livingstone, Zimbabwe.", correct: false},
            { text: "Livingstone, Zambia.", correct: true},
        ]
    }
];

//Get the elements.
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//Initialize variables inorder to track current question  index and the score.
let currentQuestionIndex = 0;
let score = 0;

//Function to start the quiz.
function startQuiz(){
    //Reset the question index and score.
    currentQuestionIndex = 0;
    score = 0;
    //Set the next button to "Next" and show the first question.
    nextButton.innerHTML = "Next";
    showQuestion();
}

//Function to display the current question and its answers.
function showQuestion(){
    //Reset the state to prepare for the new question.
    resetState();
    //Get the current question object from the questions array, calculate the question number and display the question text.
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    //Loop through each answer in the current questions answers array.
    currentQuestion.answers.forEach(answer => {
        //Craete a button element for each answer, set the button to the answer text and append the button to the answer buttons container.
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        //If the answer is correct, set a data attribute to indicate this.
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        //Add an event listener to handle the answer selection
        button.addEventListener("click", selectAnswer);
    });
}

//Function to reset the state for a new question.
function resetState(){
    nextButton.style.display = "none";//Hide the next button.
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);//Remove all answer buttons from the container.
    }
}

//Function to handle answer selection
function selectAnswer(e){
    const selectedBtn = e.target;//Get selected button.
    //Check if the selected answer is correct, if correct add the "correct" class and increase the score.
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");//When answer is wrong, add the "incorrect" class
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        //Disable all buttons to prevent further selection
        button.disabled = true;
    });
    nextButton.style.display = "block";//Show next button.
}

//Function to display the score at the end of the quiz
function showScore(){
    resetState();//Reset the state for the score display
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    //Set the next button text to this one.
    nextButton.innerHTML = "Attempt Again!";
    nextButton.style.display = "block";
}

//function to handle the next button click
function handleNextButton(){
    currentQuestionIndex++;//Move to the next question index.
    //If there are more questions show the next question. if not, show the score.
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

//Add eventlistener to handle clicks.
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();//If there are more questions, handle the next button click.
    }else{
        startQuiz();//If there are no questions, restart the quiz.
    }
});

//Start the quiz when the script is first run.
startQuiz();