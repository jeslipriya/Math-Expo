const questions = {
    1: [
        { question: "How many apples? 🍎🍎", options: ["1", "2", "3", "4"], answer: "2" },
        { question: "How many bananas? 🍌🍌🍌", options: ["1", "2", "3", "4"], answer: "3" },
        { question: "How many cars? 🚗🚗🚗🚗🚗", options: ["3", "4", "5", "6"], answer: "5" },
        { question: "How many stars? ⭐⭐⭐⭐", options: ["2", "3", "4", "5"], answer: "4" },
        { question: "How many ducks? 🦆🦆🦆🦆🦆🦆", options: ["5", "6", "7", "8"], answer: "6" },
        { question: "How many flowers? 🌸🌸🌸", options: ["1", "2", "3", "4"], answer: "3" },
        { question: "How many balls? ⚽⚽⚽⚽⚽⚽⚽", options: ["5", "6", "7", "8"], answer: "7" },
        { question: "How many fish? 🐟🐟", options: ["1", "2", "3", "4"], answer: "2" },
        { question: "How many cookies? 🍪🍪🍪🍪", options: ["2", "3", "4", "5"], answer: "4" },
        { question: "How many birds? 🐦🐦🐦🐦🐦", options: ["4", "5", "6", "7"], answer: "5" }
    ],
    2: [
        { question: "What is 1 + 1? 🤔", options: ["1", "2", "3", "4"], answer: "2" },
        { question: "What is 2 + 2? 🤔", options: ["2", "3", "4", "5"], answer: "4" },
        { question: "What is 1 + 3? 🤔", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is 2 + 3? 🤔", options: ["4", "5", "6", "7"], answer: "5" },
        { question: "What is 3 + 1? 🤔", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is 1 + 4? 🤔", options: ["4", "5", "6", "7"], answer: "5" },
        { question: "What is 2 + 1? 🤔", options: ["2", "3", "4", "5"], answer: "3" },
        { question: "What is 3 + 2? 🤔", options: ["4", "5", "6", "7"], answer: "5" },
        { question: "What is 1 + 5? 🤔", options: ["5", "6", "7", "8"], answer: "6" },
        { question: "What is 2 + 4? 🤔", options: ["5", "6", "7", "8"], answer: "6" }
    ],
    // Add more levels as needed
};

let currentLevel = 1;
let currentQuestionIndex = 0;
let score = 0;

// Sound effects
const correctSound = new Audio('correct.mp3'); // Add your correct sound file
const incorrectSound = new Audio('incorrect.mp3'); // Add your incorrect sound file

// Background music
const backgroundMusic = new Audio('music/game.mp3'); // Add your background music file
backgroundMusic.loop = true; // Loop the music
backgroundMusic.volume = 0.5; // Set volume (0.0 to 1.0)

// Start background music when the game starts
function startLevel(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-container').style.display = 'block'; // Show quiz container
    document.getElementById('welcome-prompt').style.display = 'none'; // Hide welcome prompt
    document.getElementById('feedback').innerText = ''; // Clear feedback
    backgroundMusic.play(); // Start playing background music
    generateQuestion(); // Generate the first question
}

function generateQuestion() {
    const questionData = questions[currentLevel][currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    questionData.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerText = option;
        optionElement.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(optionElement);
    });

    // Hide the next button initially
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer(selectedOption) {
    const questionData = questions[currentLevel][currentQuestionIndex];
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');

    if (selectedOption === questionData.answer) {
        score++;
        feedbackElement.innerText = "Correct! 🎉";
        feedbackElement.style.color = "#32cd32"; // Green for correct
        feedbackElement.style.fontSize = "32px"; // Ensure font size is large
        correctSound.play(); // Play correct sound
        // Show the next button after answering correctly
        document.getElementById('next-button').style.display = 'block';
    } else {
        feedbackElement.innerText = `Try Again! 😢 The correct answer was: ${questionData.answer}`;
        feedbackElement.style.color = "#ff6347"; // Red for incorrect
        feedbackElement.style.fontSize = "24px"; // Reset font size for incorrect feedback
        incorrectSound.play(); // Play incorrect sound
        // Do not show the next button
        document.getElementById('next-button').style.display = 'none';
    }

    // Update and show the score
    scoreElement.innerText = `Score: ${score}/${currentQuestionIndex + 1}`;
    scoreElement.style.display = 'block'; // Show the score
}

function nextQuestion() {
    // Clear feedback before showing the next question
    document.getElementById('feedback').innerText = '';

    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentLevel].length) {
        generateQuestion(); // Generate the next question
    } else {
        endQuiz();
    }
}

function endQuiz() {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerText = `Quiz completed! Your score: ${score}/${questions[currentLevel].length}`;
    
    // Stop background music when the quiz ends
    backgroundMusic.pause(); // Pause the background music

    // Unlock the next level if applicable
    if (currentLevel < Object.keys(questions).length) {
        const levelElements = document.querySelectorAll('.level');
        levelElements[currentLevel].classList.remove('locked');
        levelElements[currentLevel].classList.add('unlocked');
        levelElements[currentLevel].innerHTML = levelElements[currentLevel].innerHTML.replace('🔒', '✅');
    }

    // Show the Back button
    document.getElementById('back-button').style.display = 'block';
}

function goBack() {
    // Reset the quiz state
    currentQuestionIndex = 0;
    score = 0;

    // Show the first question of the current level
    document.getElementById('feedback').innerText = ''; // Clear feedback
    generateQuestion(); // Show the first question of the current level
}

function signIn(event) {
    event.preventDefault(); // Prevent the form from submitting

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (you can replace this with actual authentication logic)
    if (username === "user" && password === "password") {
        document.getElementById('signin-feedback').innerText = "Sign in successful! 🎉";
        document.getElementById('signin-feedback').style.color = "#32cd32"; // Green for success
        
        // Show the play button
        document.getElementById('play-button').style.display = 'block';
        document.getElementById('signin-container').style.display = 'none'; // Hide sign-in form
    } else {
        document.getElementById('signin-feedback').innerText = "Invalid username or password. Please try again.";
        document.getElementById('signin-feedback').style.color = "#ff6347"; // Red for error
    }
}

function startGame() {
    // Redirect to the game page
    window.location.href = "game.html"; // Make sure this matches your game page filename
}

// Optional: Function to stop background music when navigating away from the game
window.onbeforeunload = function() {
    backgroundMusic.pause(); // Pause the background music when leaving the page
};