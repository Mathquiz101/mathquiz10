const questions = [
    {
        question: "What is an angle of elevation?",
        options: [
            "The angle above the horizontal line of sight",
            "The angle below the horizontal line of sight",
            "The angle between two intersecting lines",
            "The angle inside a triangle"
        ],
        correct: 0
    },
    {
        question: "What is an angle of depression?",
        options: [
            "The angle below the horizontal line of sight",
            "The angle above the horizontal line of sight",
            "The angle between two intersecting lines",
            "The angle inside a triangle"
        ],
        correct: 0
    },
    {
        question: "If a person looks up at a tree with an angle of elevation of 30° from a distance of 10 meters, what is the height of the tree?",
        options: ["5.77 m", "8.66 m", "10 m", "17.32 m"],
        correct: 1
    },
    {
        question: "A plane is flying at a height of 3000 meters. The angle of depression to a point on the ground is 45°. What is the horizontal distance to the point?",
        options: ["3000 m", "1500 m", "4242 m", "2000 m"],
        correct: 0
    },
    {
        question: "A ladder leans against a wall making an angle of elevation of 60°. If the ladder is 10 meters long, how high up the wall does it reach?",
        options: ["8.66 m", "5 m", "10 m", "7.5 m"],
        correct: 0
    },
    {
        question: "If a lighthouse is 50 meters high and the angle of depression to a boat is 30°, what is the distance of the boat from the base of the lighthouse?",
        options: ["86.6 m", "50 m", "43.3 m", "100 m"],
        correct: 0
    },
    {
        question: "A building is 20 meters tall. The angle of elevation from a point 15 meters away from its base is:",
        options: ["53°", "45°", "30°", "60°"],
        correct: 0
    },
    {
        question: "An observer on top of a tower 100 meters high sees a car on the ground at an angle of depression of 30°. What is the horizontal distance to the car?",
        options: ["173.2 m", "100 m", "86.6 m", "200 m"],
        correct: 0
    },
    {
        question: "A flagpole casts a shadow 12 meters long when the angle of elevation of the sun is 45°. What is the height of the flagpole?",
        options: ["12 m", "6 m", "24 m", "18 m"],
        correct: 0
    },
    {
        question: "From a point on the ground, the angle of elevation to the top of a 30-meter building is 60°. What is the distance from the point to the base of the building?",
        options: ["17.32 m", "15 m", "30 m", "25 m"],
        correct: 0
    }
];


let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;
let quizEnded = false;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timerEl = document.querySelector('.timer');
const progressBar = document.querySelector('.progress');
const questionNumber = document.querySelector('.question-number');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);

function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    showQuestion();
    startTimer();
}

function startTimer() {
    timeLeft = 60;
    timerEl.textContent = `Time left: ${timeLeft}s`;
    timerEl.classList.remove('warning');
    
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;
        progressBar.style.width = `${(timeLeft/60) * 100}%`;
        
        if (timeLeft <= 10) {
            timerEl.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            autoSelectIncorrect();
        }
    }, 1000);
}

function autoSelectIncorrect() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.style.pointerEvents = 'none');
    options[questions[currentQuestion].correct].classList.add('correct');
    nextBtn.classList.remove('hide');
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionEl.textContent = question.question;
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(button);
    });

    progressBar.style.width = '100%';
}

function selectOption(index) {
    clearInterval(timer);
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    
    if (index === questions[currentQuestion].correct) {
        options[index].classList.add('correct');
        score++;
    } else {
        options[index].classList.add('incorrect');
        options[questions[currentQuestion].correct].classList.add('correct');
    }
    
    nextBtn.classList.remove('hide');
    options.forEach(option => option.style.pointerEvents = 'none');
}

function nextQuestion() {
    currentQuestion++;
    nextBtn.classList.add('hide');
    
    if (currentQuestion < questions.length) {
        showQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    quizEnded = true;
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    
    const resultEl = document.querySelector('.result');
    const percentage = (score / questions.length) * 100;
    
    resultEl.innerHTML = `
        <h2>Quiz Complete!</h2>
        <p>Your score: ${score} out of ${questions.length}</p>
        <p>Percentage: ${percentage}%</p>
        <p>Performance Rating: ${getPerformanceRating(percentage)}</p>
    `;

    // Show next level link if score is above 50%
    if (percentage > 50) {
        const nextLevelContainer = document.getElementById('next-level-container');
        const nextLevelLink = document.getElementById('next-level-link');
        const link = 'https://waecmathsuccess.github.io/mathlevel10/';
        
        nextLevelLink.href = link;
        nextLevelLink.textContent = link;
        nextLevelContainer.classList.remove('hide');
        
        // Add celebration animation
        nextLevelContainer.classList.add('celebration');
        setTimeout(() => {
            nextLevelContainer.classList.remove('celebration');
        }, 1000);
    }
}

function getPerformanceRating(percentage) {
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 70) return "Good Job! 👍";
    if (percentage >= 60) return "Keep Practicing! 📚";
    return "Need More Practice 💪";
}

function copyLink() {
    const link = document.getElementById('next-level-link').href;
    navigator.clipboard.writeText(link).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Link';
            copyBtn.style.backgroundColor = '#2ecc71';
        }, 2000);
    });
}
