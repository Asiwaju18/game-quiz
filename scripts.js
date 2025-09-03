let currentCategory = "general";
let currentDifficulty = "easy";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let totalTime = 45;
let timeLeft = totalTime;
let isQuizActive = false;
let questions = [];
let scoreboard = [];

// Difficulty Button Selection
document.querySelectorAll(".difficulty-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelector(".difficulty-btn.ring-4")
      .classList.remove("ring-4", "ring-white");
    button.classList.add("ring-4", "ring-white");
    currentDifficulty = button.dataset.difficulty;
  });
});

// Start Quiz
function startQuiz() {
  currentCategory = document.getElementById("categorySelect").value;
  questions = quizData[currentCategory][currentDifficulty];
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = totalTime;
  isQuizActive = true;

  document.getElementById("mainMenu").classList.add("hidden");
  document.getElementById("quizGame").classList.remove("hidden");
  document.getElementById("resultsScreen").classList.add("hidden");
  document.getElementById("scoreboardModal").classList.add("hidden");

  // Update total questions
  document.getElementById("totalQuestions").innerText = questions.length;

  // Start Timer
  startTimer();

  // Load First Question
  loadQuestion();
}

// Load Question
function loadQuestion() {
  resetState();
  const questionData = questions[currentQuestionIndex];
  document.getElementById("questionText").innerText = questionData.question;

  const answersContainer = document.getElementById("answersContainer");
  questionData.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add(
      "answer-btn",
      "bg-white/10",
      "backdrop-blur-lg",
      "rounded-lg",
      "px-4",
      "py-2",
      "text-lg",
      "font-semibold",
      "w-full",
      "transition-all",
      "transform",
      "hover:scale-105",
      "hover:bg-white/20", // 
      "hover:text-yellow-300" // <--- NEW: text color change on hover
    );
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(button);
  });

  // Update question number
  document.getElementById("questionNumber").innerText =
    currentQuestionIndex + 1;

  // Update progress bar
  updateProgressBar();
}
const quizData = {
  general: {
    easy: [
      {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2,
      },
      {
        question: "Which planet is closest to the sun?",
        answers: ["Earth", "Mars", "Mercury", "Venus"],
        correct: 2,
      },
      {
        question: "What is the largest mammal in the world?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        correct: 1,
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
          "Charles Dickens",
          "Mark Twain",
          "William Shakespeare",
          "Jane Austen",
        ],
        correct: 2,
      },
      {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Gold", "Iron", "Diamond", "Platinum"],
        correct: 2,
      },
      {
        question: "Which gas is most abundant in the Earth's atmosphere?",
        answers: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
        correct: 2,
      },
      {
        question: "What is the main ingredient in guacamole?",
        answers: ["Tomato", "Avocado", "Onion", "Pepper"],
        correct: 1,
      },
      {
        question:
          "Which organ in the human body is responsible for pumping blood?",
        answers: ["Lung", "Liver", "Heart", "Kidney"],
        correct: 2,
      },
      {
        question: "What is the tallest mountain in the world?",
        answers: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
        correct: 3,
      },
      {
        question: "Who painted the Mona Lisa?",
        answers: [
          "Vincent Van Gogh",
          "Pablo Picasso",
          "Leonardo da Vinci",
          "Claude Monet",
        ],
        correct: 2,
      },
    ],
    medium: [
      {
        question: "What is the capital of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2,
      },
      {
        question: "Which element has the chemical symbol 'Fe'?",
        answers: ["Gold", "Iron", "Silver", "Copper"],
        correct: 1,
      },
      {
        question: "What is the largest ocean on Earth?",
        answers: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correct: 3,
      },
      {
        question: "Who wrote '1984' and 'Animal Farm'?",
        answers: [
          "George Orwell",
          "Aldous Huxley",
          "Ray Bradbury",
          "Mark Twain",
        ],
        correct: 0,
      },
      {
        question: "What is the chemical formula for water?",
        answers: ["H2O", "CO2", "NaCl", "C6H12O6"],
        correct: 0,
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1,
      },
      {
        question: "What is the main language spoken in Brazil?",
        answers: ["Spanish", "Portuguese", "English", "French"],
        correct: 1,
      },
      {
        question: "Which organ is the largest in the human body?",
        answers: ["Liver", "Lung", "Skin", "Heart"],
        correct: 2,
      },
      {
        question: "What is the longest river in the world?",
        answers: [
          "Amazon River",
          "Nile River",
          "Yangtze River",
          "Mississippi River",
        ],
        correct: 1,
      },
      {
        question: "Who painted the ceiling of the Sistine Chapel?",
        answers: [
          "Leonardo da Vinci",
          "Vincent Van Gogh",
          "Michelangelo",
          "Raphael",
        ],
        correct: 2,
      },
    ],
    hard: [
      {
        question: "What is the capital of Iceland?",
        answers: ["Reykjavik", "Oslo", "Helsinki", "Copenhagen"],
        correct: 0,
      },
      {
        question: "Which element has the highest melting point?",
        answers: ["Tungsten", "Iron", "Gold", "Platinum"],
        correct: 0,
      },
      {
        question: "What is the largest desert in the world?",
        answers: [
          "Sahara Desert",
          "Arabian Desert",
          "Gobi Desert",
          "Kalahari Desert",
        ],
        correct: 2,
      },
      {
        question: "Who wrote 'The Catcher in the Rye'?",
        answers: [
          "J.D. Salinger",
          "F. Scott Fitzgerald",
          "Ernest Hemingway",
          "Mark Twain",
        ],
        correct: 0,
      },
      {
        question: "What is the chemical formula for methane?",
        answers: ["CH4", "C2H5OH", "NH3", "H2O"],
        correct: 0,
      },
      {
        question: "Which planet has the most moons?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2,
      },
      {
        question:
          "What is the primary ingredient in traditional Japanese sake?",
        answers: ["Barley", "Rice", "Corn", "Wheat"],
        correct: 1,
      },
      {
        question:
          "Which organ is responsible for detoxifying chemicals in the human body?",
        answers: ["Liver", "Kidney", "Lung", "Heart"],
        correct: 0,
      },
      {
        question: "What is the smallest bone in the human body?",
        answers: ["Stapes", "Incus", "Malleus", "Cochlea"],
        correct: 0,
      },
      {
        question: "Who painted 'The Starry Night'?",
        answers: [
          "Pablo Picasso",
          "Vincent Van Gogh",
          "Claude Monet",
          "Leonardo da Vinci",
        ],
        correct: 1,
      },
    ],
  },
  science: {
    easy: [
      {
        question: "What is the chemical symbol for hydrogen?",
        answers: ["H", "O", "N", "C"],
        correct: 0,
      },
      {
        question: "What planet is closest to the sun?",
        answers: ["Earth", "Mars", "Mercury", "Venus"],
        correct: 2,
      },
      {
        question: "What is the most abundant gas in Earth's atmosphere?",
        answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: 1,
      },
      {
        question: "What is the chemical formula for water?",
        answers: ["H2O", "CO2", "NaCl", "C6H12O6"],
        correct: 0,
      },
      {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Gold", "Iron", "Diamond", "Platinum"],
        correct: 2,
      },
      {
        question: "Which gas is most abundant in the Earth's atmosphere?",
        answers: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
        correct: 2,
      },
      {
        question: "What is the main ingredient in guacamole?",
        answers: ["Tomato", "Avocado", "Onion", "Pepper"],
        correct: 1,
      },
      {
        question:
          "Which organ in the human body is responsible for pumping blood?",
        answers: ["Lung", "Liver", "Heart", "Kidney"],
        correct: 2,
      },
      {
        question: "What is the tallest mountain in the world?",
        answers: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
        correct: 3,
      },
      {
        question: "Who painted the Mona Lisa?",
        answers: [
          "Vincent Van Gogh",
          "Pablo Picasso",
          "Leonardo da Vinci",
          "Claude Monet",
        ],
        correct: 2,
      },
    ],
    medium: [
      {
        question: "What is the capital of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2,
      },
      {
        question: "Which element has the chemical symbol 'Fe'?",
        answers: ["Gold", "Iron", "Silver", "Copper"],
        correct: 1,
      },
      {
        question: "What is the largest ocean on Earth?",
        answers: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correct: 3,
      },
      {
        question: "Who wrote '1984' and 'Animal Farm'?",
        answers: [
          "George Orwell",
          "Aldous Huxley",
          "Ray Bradbury",
          "Mark Twain",
        ],
        correct: 0,
      },
      {
        question: "What is the chemical formula for water?",
        answers: ["H2O", "CO2", "NaCl", "C6H12O6"],
        correct: 0,
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1,
      },
      {
        question: "What is the main language spoken in Brazil?",
        answers: ["Spanish", "Portuguese", "English", "French"],
        correct: 1,
      },
      {
        question: "Which organ is the largest in the human body?",
        answers: ["Liver", "Lung", "Skin", "Heart"],
        correct: 2,
      },
      {
        question: "What is the longest river in the world?",
        answers: [
          "Amazon River",
          "Nile River",
          "Yangtze River",
          "Mississippi River",
        ],
        correct: 1,
      },
      {
        question: "Who painted the ceiling of the Sistine Chapel?",
        answers: [
          "Leonardo da Vinci",
          "Vincent Van Gogh",
          "Michelangelo",
          "Raphael",
        ],
        correct: 2,
      },
    ],
    hard: [
      {
        question: "What is the capital of Iceland?",
        answers: ["Reykjavik", "Oslo", "Helsinki", "Copenhagen"],
        correct: 0,
      },
      {
        question: "Which element has the highest melting point?",
        answers: ["Tungsten", "Iron", "Gold", "Platinum"],
        correct: 0,
      },
      {
        question: "What is the largest desert in the world?",
        answers: [
          "Sahara Desert",
          "Arabian Desert",
          "Gobi Desert",
          "Kalahari Desert",
        ],
        correct: 2,
      },
      {
        question: "Who wrote 'The Catcher in the Rye'?",
        answers: [
          "J.D. Salinger",
          "F. Scott Fitzgerald",
          "Ernest Hemingway",
          "Mark Twain",
        ],
        correct: 0,
      },
      {
        question: "What is the chemical formula for methane?",
        answers: ["CH4", "C2H5OH", "NH3", "H2O"],
        correct: 0,
      },
      {
        question: "Which planet has the most moons?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2,
      },
      {
        question:
          "What is the primary ingredient in traditional Japanese sake?",
        answers: ["Barley", "Rice", "Corn", "Wheat"],
        correct: 1,
      },
      {
        question:
          "Which organ is responsible for detoxifying chemicals in the human body?",
        answers: ["Liver", "Kidney", "Lung", "Heart"],
        correct: 0,
      },
      {
        question: "What is the smallest bone in the human body?",
        answers: ["Stapes", "Incus", "Malleus", "Cochlea"],
        correct: 0,
      },
      {
        question: "Who painted 'The Starry Night'?",
        answers: [
          "Pablo Picasso",
          "Vincent Van Gogh",
          "Claude Monet",
          "Leonardo da Vinci",
        ],
        correct: 1,
      },
    ],
  },
  history: {
    easy: [
      {
        question: "Who was the first President of the United States?",
        answers: [
          "George Washington",
          "Thomas Jefferson",
          "Abraham Lincoln",
          "John Adams",
        ],
        correct: 0,
      },
      {
        question: "In which year did the Titanic sink?",
        answers: ["1912", "1905", "1898", "1923"],
        correct: 0,
      },
      {
        question: "Who painted the Mona Lisa?",
        answers: [
          "Vincent Van Gogh",
          "Pablo Picasso",
          "Leonardo da Vinci",
          "Claude Monet",
        ],
        correct: 2,
      },
      {
        question: "What is the capital of Japan?",
        answers: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correct: 2,
      },
      {
        question: "Which ancient civilization built the pyramids?",
        answers: ["Romans", "Greeks", "Egyptians", "Mayans"],
        correct: 2,
      },
      {
        question:
          "Who was the first woman to fly solo across the Atlantic Ocean?",
        answers: [
          "Amelia Earhart",
          "Harriet Quimby",
          "Bessie Coleman",
          "Jacqueline Cochran",
        ],
        correct: 0,
      },
      {
        question: "What year did World War II begin?",
        answers: ["1939", "1945", "1914", "1941"],
        correct: 0,
      },
      {
        question: "Who discovered penicillin?",
        answers: [
          "Marie Curie",
          "Louis Pasteur",
          "Alexander Fleming",
          "Isaac Newton",
        ],
        correct: 2,
      },
      {
        question: "What is the longest river in the world?",
        answers: [
          "Amazon River",
          "Nile River",
          "Yangtze River",
          "Mississippi River",
        ],
        correct: 1,
      },
      {
        question: "Who was the first man on the moon?",
        answers: [
          "Yuri Gagarin",
          "Neil Armstrong",
          "Buzz Aldrin",
          "Michael Collins",
        ],
        correct: 1,
      },
    ],
    medium: [
      {
        question: "What is the capital of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2,
      },
      {
        question: "Which element has the chemical symbol 'Fe'?",
        answers: ["Gold", "Iron", "Silver", "Copper"],
        correct: 1,
      },
      {
        question: "What is the largest ocean on Earth?",
        answers: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correct: 3,
      },
      {
        question: "Who wrote '1984' and 'Animal Farm'?",
        answers: [
          "George Orwell",
          "Aldous Huxley",
          "Ray Bradbury",
          "Mark Twain",
        ],
        correct: 0,
      },
      {
        question: "What is the chemical formula for water?",
        answers: ["H2O", "CO2", "NaCl", "C6H12O6"],
        correct: 0,
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1,
      },
      {
        question: "What is the main language spoken in Brazil?",
        answers: ["Spanish", "Portuguese", "English", "French"],
        correct: 1,
      },
      {
        question: "Which organ is the largest in the human body?",
        answers: ["Liver", "Lung", "Skin", "Heart"],
        correct: 2,
      },
      {
        question: "What is the longest river in the world?",
        answers: [
          "Amazon River",
          "Nile River",
          "Yangtze River",
          "Mississippi River",
        ],
        correct: 1,
      },
      {
        question: "Who painted the ceiling of the Sistine Chapel?",
        answers: [
          "Leonardo da Vinci",
          "Vincent Van Gogh",
          "Michelangelo",
          "Raphael",
        ],
        correct: 2,
      },
    ],
    hard: [
      {
        question: "What is the capital of Iceland?",
        answers: ["Reykjavik", "Oslo", "Helsinki", "Copenhagen"],
        correct: 0,
      },
      {
        question: "Which element has the highest melting point?",
        answers: ["Tungsten", "Iron", "Gold", "Platinum"],
        correct: 0,
      },
      {
        question: "What is the largest desert in the world?",
        answers: [
          "Sahara Desert",
          "Arabian Desert",
          "Gobi Desert",
          "Kalahari Desert",
        ],
        correct: 2,
      },
      {
        question: "Who wrote 'The Catcher in the Rye'?",
        answers: [
          "J.D. Salinger",
          "F. Scott Fitzgerald",
          "Ernest Hemingway",
          "Mark Twain",
        ],
        correct: 0,
      },
      {
        question: "What is the chemical formula for methane?",
        answers: ["CH4", "C2H5OH", "NH3", "H2O"],
        correct: 0,
      },
      {
        question: "Which planet has the most moons?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2,
      },
      {
        question:
          "What is the primary ingredient in traditional Japanese sake?",
        answers: ["Barley", "Rice", "Corn", "Wheat"],
        correct: 1,
      },
      {
        question:
          "Which organ is responsible for detoxifying chemicals in the human body?",
        answers: ["Liver", "Kidney", "Lung", "Heart"],
        correct: 0,
      },
      {
        question: "What is the smallest bone in the human body?",
        answers: ["Stapes", "Incus", "Malleus", "Cochlea"],
        correct: 0,
      },
      {
        question: "Who painted 'The Starry Night'?",
        answers: [
          "Pablo Picasso",
          "Vincent Van Gogh",
          "Claude Monet",
          "Leonardo da Vinci",
        ],
        correct: 1,
      },
    ],
  },
  sports: {
    easy: [
      {
        question: "Which sport is known as the 'king of sports'?",
        answers: ["Football", "Basketball", "Cricket", "Tennis"],
        correct: 0,
      },
      {
        question:
          "In which sport do players use a racket to hit a shuttlecock?",
        answers: ["Tennis", "Badminton", "Squash", "Table Tennis"],
        correct: 1,
      },
      {
        question: "Which country won the FIFA World Cup in 2018?",
        answers: ["Germany", "Brazil", "France", "Argentina"],
        correct: 2,
      },
      {
        question: "How many players are there in a rugby union team?",
        answers: ["13", "15", "11", "7"],
        correct: 1,
      },
      {
        question: "Which sport is played on a diamond-shaped field?",
        answers: ["Cricket", "Baseball", "Softball", "Rounders"],
        correct: 1,
      },
      {
        question: "In which sport do teams compete for the Stanley Cup?",
        answers: ["Basketball", "Ice Hockey", "Football", "Baseball"],
        correct: 1,
      },
      {
        question:
          "Which country is known as the birthplace of the Olympic Games?",
        answers: ["Greece", "Italy", "France", "Germany"],
        correct: 0,
      },
      {
        question: "How many minutes are there in a rugby match (union)?",
        answers: ["80", "90", "70", "60"],
        correct: 0,
      },
      {
        question: "Which sport involves climbing up a rope?",
        answers: ["Gymnastics", "Rock Climbing", "Athletics", "Swimming"],
        correct: 1,
      },
      {
        question:
          "Who holds the record for the most goals in World Cup history?",
        answers: [
          "Pele",
          "Diego Maradona",
          "Cristiano Ronaldo",
          "Lionel Messi",
        ],
        correct: 2,
      },
    ],
    medium: [
      {
        question: "What is the capital of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2,
      },
      {
        question: "Which element has the chemical symbol 'Fe'?",
        answers: ["Gold", "Iron", "Silver", "Copper"],
        correct: 1,
      },
      {
        question: "What is the largest ocean on Earth?",
        answers: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        correct: 3,
      },
      {
        question: "Who wrote '1984' and 'Animal Farm'?",
        answers: [
          "George Orwell",
          "Aldous Huxley",
          "Ray Bradbury",
          "Mark Twain",
        ],
        correct: 0,
      },
      {
        question: "What is the chemical formula for water?",
        answers: ["H2O", "CO2", "NaCl", "C6H12O6"],
        correct: 0,
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1,
      },
      {
        question: "What is the main language spoken in Brazil?",
        answers: ["Spanish", "Portuguese", "English", "French"],
        correct: 1,
      },
      {
        question: "Which organ is the largest in the human body?",
        answers: ["Liver", "Lung", "Skin", "Heart"],
        correct: 2,
      },
      {
        question: "What is the longest river in the world?",
        answers: [
          "Amazon River",
          "Nile River",
          "Yangtze River",
          "Mississippi River",
        ],
        correct: 1,
      },
      {
        question: "Who painted the ceiling of the Sistine Chapel?",
        answers: [
          "Leonardo da Vinci",
          "Vincent Van Gogh",
          "Michelangelo",
          "Raphael",
        ],
        correct: 2,
      },
    ],
    hard: [
      {
        question: "What is the capital of Iceland?",
        answers: ["Reykjavik", "Oslo", "Helsinki", "Copenhagen"],
        correct: 0,
      },
      {
        question: "Which element has the highest melting point?",
        answers: ["Tungsten", "Iron", "Gold", "Platinum"],
        correct: 0,
      },
      {
        question: "What is the largest desert in the world?",
        answers: [
          "Sahara Desert",
          "Arabian Desert",
          "Gobi Desert",
          "Kalahari Desert",
        ],
        correct: 2,
      },
      {
        question: "Who wrote 'The Catcher in the Rye'?",
        answers: [
          "J.D. Salinger",
          "F. Scott Fitzgerald",
          "Ernest Hemingway",
          "Mark Twain",
        ],
        correct: 0,
      },
      {
        question: "What is the chemical formula for methane?",
        answers: ["CH4", "C2H5OH", "NH3", "H2O"],
        correct: 0,
      },
      {
        question: "Which planet has the most moons?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 2,
      },
      {
        question:
          "What is the primary ingredient in traditional Japanese sake?",
        answers: ["Barley", "Rice", "Corn", "Wheat"],
        correct: 1,
      },
      {
        question:
          "Which organ is responsible for detoxifying chemicals in the human body?",
        answers: ["Liver", "Kidney", "Lung", "Heart"],
        correct: 0,
      },
      {
        question: "What is the smallest bone in the human body?",
        answers: ["Stapes", "Incus", "Malleus", "Cochlea"],
        correct: 0,
      },
      {
        question: "Who painted 'The Starry Night'?",
        answers: [
          "Pablo Picasso",
          "Vincent Van Gogh",
          "Claude Monet",
          "Leonardo da Vinci",
        ],
        correct: 1,
      },
    ],
  },
};

// Select Answer
function selectAnswer(selectedIndex) {
  if (!isQuizActive) return;

  isQuizActive = false; // Disable further answer selection

  const questionData = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === questionData.correct;
  const answerButtons = document.querySelectorAll(".answer-btn");

  // Show correct answer
  answerButtons[questionData.correct].classList.add("bg-green-500", "text-white");

  if (!isCorrect) {
    // Show selected answer in red if incorrect
    answerButtons[selectedIndex].classList.add("bg-red-500", "text-white");
  }

  // 🔒 Disable hover effect after answering
  answerButtons.forEach((btn) => {
    btn.classList.remove("hover:bg-white/20", "hover:text-yellow-300", "hover:scale-105");
    btn.disabled = true; // Prevent extra clicks
  });

  // Update score
  if (isCorrect) {
    score++;
    document.getElementById("currentScore").innerText = score;
  }

  // Move to next question after 1 second
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      isQuizActive = true; // Re-enable for next question
    } else {
      endQuiz();
    }
  }, 1000);
}

// Update Progress Bar
function updateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${percentage}%`;
}

// Start Timer
function startTimer() {
  const timerCircle = document.getElementById("timerCircle");
  const timeLeftText = document.getElementById("timeLeft");
  timeLeft = totalTime; // Reset timeLeft when starting the timer
  timeLeftText.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeLeftText.innerText = timeLeft;

    // Update timer circle
    const percentage = (timeLeft / totalTime) * 283;
    timerCircle.style.strokeDashoffset = `${percentage}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// End Quiz
function endQuiz() {
  isQuizActive = false;
  clearInterval(timer);

  // Calculate final score and time
  const finalScore = document.getElementById("finalScore");
  finalScore.innerText = `${score} / ${questions.length}`;

  const finalPercentage = document.getElementById("finalPercentage");
  finalPercentage.innerText = `${((score / questions.length) * 100).toFixed(
    2
  )}%`;

  const finalTime = document.getElementById("finalTime");
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  finalTime.innerText = `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  // Performance message
  const performanceMessage = document.getElementById("performanceMessage");
  if (score === questions.length) {
    performanceMessage.innerText = "Perfect Score! 🎉";
  } else if (score >= questions.length / 2) {
    performanceMessage.innerText = "Great Job! 👍";
  } else {
    performanceMessage.innerText = "Better luck next time! 😢";
  }

  document.getElementById("quizGame").classList.add("hidden");
  document.getElementById("resultsScreen").classList.remove("hidden");

  // Update Scoreboard
  updateScoreboard(currentCategory, currentDifficulty, score);
}

// Reset State
function resetState() {
  const answersContainer = document.getElementById("answersContainer");
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
}

// Play Again
function playAgain() {
  document.getElementById("resultsScreen").classList.add("hidden");
  document.getElementById("mainMenu").classList.remove("hidden");
}

// Show Scoreboard
function showScoreboard() {
  document.getElementById("scoreboardModal").classList.remove("hidden");
  displayScoreboard();
}

// Close Scoreboard
function closeScoreboard() {
  document.getElementById("scoreboardModal").classList.add("hidden");
}

// Update Scoreboard
function updateScoreboard(category, difficulty, score) {
  scoreboard.push({ category, difficulty, score });
  scoreboard.sort((a, b) => b.score - a.score); // Sort by highest score
  // Keep only the top 10 scores
  scoreboard = scoreboard.slice(0, 10);
  localStorage.setItem("scoreboard", JSON.stringify(scoreboard)); // Save to local storage
}

// Display Scoreboard
function displayScoreboard() {
  const scoreboardTable = document.getElementById("scoreboardTable");
  scoreboardTable.innerHTML = ""; // Clear existing table

  // Retrieve scoreboard from local storage
  const storedScoreboard = localStorage.getItem("scoreboard");
  scoreboard = storedScoreboard ? JSON.parse(storedScoreboard) : [];

  if (scoreboard.length === 0) {
    scoreboardTable.innerHTML = "<p>No scores yet!</p>";
    return;
  }

  const tableHeader = document.createElement("div");
  tableHeader.classList.add("flex", "justify-between", "font-bold", "mb-2");
  tableHeader.innerHTML = `
          <div>Category</div>
          <div>Difficulty</div>
          <div>Score</div>
        `;
  scoreboardTable.appendChild(tableHeader);

  scoreboard.forEach((entry) => {
    const row = document.createElement("div");
    row.classList.add(
      "flex",
      "justify-between",
      "py-2",
      "border-b",
      "border-white/20"
    );
    row.innerHTML = `
            <div>${entry.category}</div>
            <div>${entry.difficulty}</div>
            <div>${entry.score}</div>
          `;
    scoreboardTable.appendChild(row);
  });
}

// Initial Setup
(function () {
  // Set default category and difficulty
  document.getElementById("categorySelect").value = "general";
  document
    .querySelector(".difficulty-btn[data-difficulty='easy']")
    .classList.add("ring-4", "ring-white");
  currentDifficulty = document.querySelector(".difficulty-btn.ring-4").dataset
    .difficulty;
  displayScoreboard();
})();

document.getElementById("startQuiz").addEventListener("click", startQuiz);
document
  .getElementById("showScoreboard")
  .addEventListener("click", showScoreboard);
document.getElementById("playAgain").addEventListener("click", playAgain);
document.getElementById("backToMenu").addEventListener("click", playAgain); // If you want Main Menu to behave like Play Again
document
  .getElementById("closeScoreboard")
  .addEventListener("click", closeScoreboard);
