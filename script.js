const questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answer: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: false },
            { text: "both A and B", correct: true }
        ]
    },
    {
        question: "What does the &nbsp;===&nbsp; operator do in JavaScript?",
        answer: [
            { text: "Compares values for equality without type conversion", correct: true },
            { text: "Assigns a value to a variable", correct: false },
            { text: "Compares values for equality with type conversion", correct: false },
            { text: "Checks if a variable is undefined", correct: false }
        ]
    },
    {
        question: "Which of the following is not a valid way to declare a function in JavaScript?",
        answer: [
            { text: "function myFunction() {}", correct: false },
            { text: "var myFunction = function() {};", correct: false },
            { text: " const myFunction = () => {};", correct: false },
            { text: "let myFunction: function() {}", correct: true }
        ]
    },
    {
        question: "What does the setTimeout function do in JavaScript?",
        answer: [
            { text: "Delays the execution of a function", correct: true },
            { text: "Sets an interval for a function to be repeatedly executed", correct: false },
            { text: " Returns the current timestamp", correct: false },
            { text: "Creates a new thread for parallel execution", correct: false }
        ]
    },
    {
        question: "How do you comment a single line in JavaScript?",
        answer: [
            { text: "&lt!--This is a comment--&gt", correct: false },
            { text: " /This is a comment/", correct: false },
            { text: " //This is a comment", correct: true },
            { text: "This is a comment", correct: false }
        ]
    },

];

const questionElement = document.getElementById('question');
const answerElements = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
// console.log(questionElement);
// console.log(answerElements);
let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`

    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerElements.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    })
}
function resetState() {
    nextBtn.style.display = "none";
    while (answerElements.firstChild) {
        answerElements.removeChild(answerElements.firstChild);
    }
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const correctAnswer = selectedButton.dataset.correct === 'true';
    if (correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong')
    }
    Array.from(answerElements.children).forEach((button) => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML =`You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = 'block';
}
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
});
startQuiz();