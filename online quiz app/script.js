const quizData = {
    easy: [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
             question: "What is -2 + 2?",
            options: ["3", "0", "5", "6"],
            answer: "0"
        },
        {
            question: "Which planet is known as the ring planey?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter"
        }
    ],
    medium: [
        {
            question: "What is the chemical symbol for Gold?",
            options: ["Au", "Ag", "Pb", "Fe"],
            answer: "Au"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
         {
            question: "Which planet is nearest to Sun ?",
            options: ["Earth", "Mercury", "Jupiter", "Saturn"],
            answer: "Mercury"
        }
    ],
    hard: [
        {
            question: "What is the value of Planck's constant?",
            options: ["6.626 × 10^-34 Js", "9.81 m/s^2", "3.14", "1.602 × 10^-19 C"],
            answer: "6.626 × 10^-34 Js"
        },
        {
            question: "What is the capital of Mongolia?",
            options: ["Ulaanbaatar", "Kabul", "Astana", "Baku"],
            answer: "Ulaanbaatar"
        },
        {
            question: "What is the capital of Mexico?",
            options: ["Ulaanbaatar", "Mexico city", "Astana", "Baku"],
            answer: "Mexico city"
        }
    ],
};

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let difficulty = 'easy';

function startQuiz(selectedDifficulty) {
    difficulty = selectedDifficulty;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById("difficulty-selector").classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    document.getElementById("result-container").classList.add("hidden");
    showQuestion();
    startTimer();
}

function showQuestion() {
    const question = quizData[difficulty][currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // Clear previous options
    
    question.options.forEach(option => {
        const optionElement = document.createElement("div");
        optionElement.textContent = option;
        optionElement.className = "option";
        optionElement.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(optionElement);
    });
}

function checkAnswer(selectedOption) {
    const question = quizData[difficulty][currentQuestionIndex];
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        if (option.textContent === question.answer) {
            option.classList.add("correct");
        } else if (option.textContent === selectedOption) {
            option.classList.add("incorrect");
        }
    });

    if (selectedOption === question.answer) {
        score++;
    }

    clearInterval(timer);
    setTimeout(nextQuestion, 1000); // Wait for 1 second before moving to the next question
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[difficulty].length) {
        showQuestion();
        timeLeft = 60; // Reset timer for new question
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");
    document.getElementById("score").textContent = score;
    // Update high score if necessary
    const highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        document.getElementById("high-score").textContent = score;
    } else {
        document.getElementById("high-score").textContent = highScore;
    }
}

function startTimer() {
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); // Move to the next question when time runs out
        }
    }, 1000);
}

document.querySelectorAll(".difficulty-button").forEach(button => {
    button.addEventListener("click", () => startQuiz(button.getAttribute("data-difficulty")));
});
