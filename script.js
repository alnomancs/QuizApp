const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Lisbon", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  // Add more questions here
];

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

let currentQuestionIndex, score;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add("hide");
  restartButton.classList.add("hide");
  scoreContainer.classList.add("hide");
  questionContainerElement.classList.remove("hide");
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = "";
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer));
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(button, answer) {
  const correct = answer.correct;
  button.classList.add(correct ? "correct" : "incorrect");
  Array.from(answerButtonsElement.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.innerText === answer.text) {
      btn.classList.add(
        btn === button ? (correct ? "correct" : "incorrect") : ""
      );
    }
  });
  if (correct) {
    score++;
  }
  nextButton.classList.remove("hide");
  if (currentQuestionIndex === questions.length - 1) {
    nextButton.innerText = "Finish";
  }
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add("hide");
  } else {
    showScore();
  }
}

function showScore() {
  questionContainerElement.classList.add("hide");
  nextButton.classList.add("hide");
  scoreContainer.classList.remove("hide");
  scoreElement.innerText = `${score} out of ${questions.length}`;
  restartButton.classList.remove("hide");
}

function restartQuiz() {
  nextButton.innerText = "Next";
  startQuiz();
}

nextButton.addEventListener("click", handleNextButton);
restartButton.addEventListener("click", restartQuiz);
startQuiz();
