let currentCategory = "general";
let currentDifficulty = "easy";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let totalTime = 30;
let timeLeft = totalTime;
let isQuizActive = false;
let questions = [];
let scoreboard = [];
let quizStartTime = null; // timestamp when quiz starts (ms)
let quizEnded = false; // prevent endQuiz from running multiple times

// Difficulty Button Selection
document.querySelectorAll(".difficulty-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const prev = document.querySelector(".difficulty-btn.ring-4");
    if (prev) {
      prev.classList.remove("ring-4", "ring-white", "ring-slate-700");
    }
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
  // Set timer duration based on difficulty
  if (currentDifficulty === "easy") {
    totalTime = 60;
  } else if (currentDifficulty === "medium") {
    totalTime = 45;
  } else {
    totalTime = 30;
  }
  timeLeft = totalTime;
  quizStartTime = Date.now(); // record when quiz starts
  isQuizActive = true;
  quizEnded = false; // reset end guard when starting

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
  if (!questionData) {
    // No question found (safety) — end the quiz
    endQuiz();
    return;
  }
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
  "hover:text-black" // <--- NEW: text color change on hover
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
        question: "In which year was the United States Declaration of Independence signed?",
        answers: ["1776", "1783", "1804", "1765"],
        correct: 0,
      },
      {
        question: "Who was the British Prime Minister for most of World War II?",
        answers: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Stanley Baldwin"],
        correct: 0,
      },
      {
        question: "The Renaissance began in which country?",
        answers: ["Italy", "France", "England", "Spain"],
        correct: 0,
      },
      {
        question: "What was the name of the ship that carried the Pilgrims to North America in 1620?",
        answers: ["Mayflower", "Santa Maria", "Endeavour", "Beagle"],
        correct: 0,
      },
      {
        question: "Which city was famously divided by a wall from 1961 to 1989?",
        answers: ["Berlin", "Vienna", "Prague", "Budapest"],
        correct: 0,
      },
      {
        question: "Who was the first female Prime Minister of the United Kingdom?",
        answers: ["Margaret Thatcher", "Theresa May", "Angela Merkel", "Indira Gandhi"],
        correct: 0,
      },
      {
        question: "Which empire was led by Genghis Khan?",
        answers: ["Mongol Empire", "Ottoman Empire", "Roman Empire", "Persian Empire"],
        correct: 0,
      },
      {
        question: "In which year did World War I begin?",
        answers: ["1914", "1918", "1939", "1905"],
        correct: 0,
      },
      {
        question: "Who led the National Socialist German Workers' Party (Nazi Party)?",
        answers: ["Adolf Hitler", "Joseph Stalin", "Benito Mussolini", "Francisco Franco"],
        correct: 0,
      },
      {
        question: "Which pre-Columbian civilization built Machu Picchu?",
        answers: ["Inca", "Maya", "Aztec", "Olmec"],
        correct: 0,
      },
    ],
    hard: [
      {
        question: "In which year did the Norman Conquest of England occur?",
        answers: ["1066", "1215", "1016", "1088"],
        correct: 0,
      },
      {
        question: "Which treaty formally ended World War I with Germany?",
        answers: ["Treaty of Versailles", "Treaty of Tordesillas", "Treaty of Utrecht", "Treaty of Ghent"],
        correct: 0,
      },
      {
        question: "Who is generally considered the first Roman emperor?",
        answers: ["Augustus", "Julius Caesar", "Nero", "Caligula"],
        correct: 0,
      },
      {
        question: "In which year did the Bolshevik (Russian) Revolution occur?",
        answers: ["1917", "1905", "1922", "1914"],
        correct: 0,
      },
      {
        question: "Which explorer's expedition completed the first circumnavigation of the globe?",
        answers: ["Ferdinand Magellan (expedition)", "Christopher Columbus", "Vasco da Gama", "James Cook"],
        correct: 0,
      },
      {
        question: "The Peace of Westphalia (1648) ended which major European conflict?",
        answers: ["Thirty Years' War", "Hundred Years' War", "Seven Years' War", "War of Spanish Succession"],
        correct: 0,
      },
      {
        question: "Which Chinese dynasty began construction of much of the Forbidden City in Beijing?",
        answers: ["Ming Dynasty", "Qing Dynasty", "Han Dynasty", "Tang Dynasty"],
        correct: 0,
      },
      {
        question: "Which Carthaginian general famously crossed the Alps to fight Rome?",
        answers: ["Hannibal", "Scipio Africanus", "Hasdrubal", "Mago"],
        correct: 0,
      },
      {
        question: "Which pandemic began in 1347 and devastated Europe?",
        answers: ["Black Death", "Great Plague of London", "Spanish Flu", "Cholera"],
        correct: 0,
      },
      {
        question: "Which Roman emperor issued the Edict of Milan granting tolerance to Christians?",
        answers: ["Constantine I", "Diocletian", "Theodosius I", "Nero"],
        correct: 0,
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
      question: "What is the capital of the Byzantine Empire?",
      answers: ["Rome", "Athens", "Constantinople", "Alexandria"],
      correct: 2,
    },
    {
      question: "Who was the first emperor of Rome?",
      answers: ["Julius Caesar", "Augustus", "Nero", "Marcus Aurelius"],
      correct: 1,
    },
    {
      question: "The Cold War was mainly between which two superpowers?",
      answers: [
        "USA and Germany",
        "USA and USSR",
        "USSR and China",
        "USA and Japan",
      ],
      correct: 1,
    },
    {
      question: "In which year did India gain independence from Britain?",
      answers: ["1945", "1947", "1950", "1952"],
      correct: 1,
    },
    {
      question: "Who was the British Prime Minister during World War II?",
      answers: [
        "Winston Churchill",
        "Neville Chamberlain",
        "Margaret Thatcher",
        "Tony Blair",
      ],
      correct: 0,
    },
    {
      question: "Which war was fought between the North and South regions of the United States?",
      answers: [
        "American Revolution",
        "Civil War",
        "Cold War",
        "Vietnam War",
      ],
      correct: 1,
    },
    {
      question: "Who was the longest-serving British monarch before Queen Elizabeth II?",
      answers: ["Queen Victoria", "Henry VIII", "George III", "Elizabeth I"],
      correct: 0,
    },
    {
      question: "What was the name of the ship on which the Pilgrims traveled to America in 1620?",
      answers: ["Santa Maria", "Mayflower", "Endeavour", "Discovery"],
      correct: 1,
    },
    {
      question: "Who was the leader of the Soviet Union during World War II?",
      answers: ["Vladimir Lenin", "Joseph Stalin", "Nikita Khrushchev", "Trotsky"],
      correct: 1,
    },
    {
      question: "The Great Fire of London happened in which year?",
      answers: ["1666", "1688", "1605", "1701"],
      correct: 0,
    },
  ],
  hard: [
    {
      question: "Who was the last Tsar of Russia?",
      answers: ["Nicholas I", "Alexander II", "Nicholas II", "Peter the Great"],
      correct: 2,
    },
    {
      question: "What year did the Berlin Wall fall?",
      answers: ["1987", "1989", "1991", "1993"],
      correct: 1,
    },
    {
      question: "Which treaty ended World War I?",
      answers: [
        "Treaty of Paris",
        "Treaty of Versailles",
        "Treaty of Ghent",
        "Treaty of Utrecht",
      ],
      correct: 1,
    },
    {
      question: "Who was the founder of the Mongol Empire?",
      answers: ["Kublai Khan", "Genghis Khan", "Tamerlane", "Attila the Hun"],
      correct: 1,
    },
    {
      question: "What dynasty built most of the Great Wall of China?",
      answers: ["Han", "Ming", "Tang", "Qin"],
      correct: 1,
    },
    {
      question: "The Hundred Years' War was fought between which two countries?",
      answers: [
        "England and Germany",
        "France and Spain",
        "England and France",
        "France and Italy",
      ],
      correct: 2,
    },
    {
      question: "Who was the first President of South Africa after apartheid?",
      answers: [
        "Nelson Mandela",
        "Jacob Zuma",
        "Thabo Mbeki",
        "Desmond Tutu",
      ],
      correct: 0,
    },
    {
      question: "Who was the first emperor of China?",
      answers: [
        "Confucius",
        "Han Wudi",
        "Qin Shi Huang",
        "Sun Yat-sen",
      ],
      correct: 2,
    },
    {
      question: "What was the name of the first successful English colony in America?",
      answers: ["Jamestown", "Plymouth", "Roanoke", "Boston"],
      correct: 0,
    },
    {
      question: "Who was assassinated in Sarajevo in 1914, sparking World War I?",
      answers: [
        "Archduke Franz Ferdinand",
        "Kaiser Wilhelm II",
        "Tsar Nicholas II",
        "Winston Churchill",
      ],
      correct: 0,
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
        question: "What’s the diameter of a basketball hoop in inches?",
        answers: ["18", "20", "22", "24"],
        correct: 0,
      },
      {
        question: "The Olympics are held every how many years?",
        answers: ["2", "3", "4", "5"],
        correct: 2,
      },
      {
        question: " What sport is best known as the ‘king of sports’?",
        answers: [
          "Football",
          "Basketball",
          "Cricket",
          "Tennis",
        ],
        correct: 0,
      },
      {
        question: "What are the one national sports of Canada?",
        answers: [
          "Ice Hockey",
          "Lacrosse",
          "Basketball",
          "Soccer",
        ],
        correct: 0,
      },
      {
        question: "What country has competed the most times in the Summer Olympics yet hasn’t won a gold medal?",
        answers: ["The Philippines.", "Nigeria", "London", "Canada"],
        correct: 0,
      },
      {
        question: "Where will the 2028 Summer Olympics be held?",
        answers: ["Los Angeles", "Nigeria", "New York", "United States"],
        correct: 0,
      },
      {
        question: "What does NBA stand for?",
        answers: ["National Basketball Association", "National Baseball Association", "National Football Association", "National Hockey Association"],
        correct: 0,
      },
      {
        question: "How many holes are played in an average round of golf?",
        answers: ["9", "12", "18", "24"],
        correct: 2,
      },
      {
        question: "What color are the goalposts in football?",
        answers: [
            "Yellow",
            "Red",
            "Blue",
            "Green",
        ],
        correct: 0,
      },
      {
        question: "How long is a marathon?",
        answers: [
          "26.2 miles",
          "24 miles",
          "30 miles",
          "20 miles",
        ],
        correct: 0,
      },
    ],
    hard: [
      {
        question: "In what game is “love” a score?",
        answers: ["Tennis", "Badminton", "Squash", "Table Tennis"],
        correct: 0,
      },
      {
        question: "What sport is a lot like softball?",
        answers: ["Baseball", "Football", "Golf", "Platinum"],
        correct: 0,
      },
      {
        question: "In football, how many points does a touchdown hold?",
        answers: [
          "6",
          "7",
          "3",
          "1",
        ],
        correct: 0,
      },
      {
        question: "How many players are on a baseball team?",
        answers: [
          "9",
          "12",
          "18",
          "24",
        ],
        correct: 0,
      },
      {
        question: "In soccer, what body part can’t touch the ball?",
        answers: ["Hands", "Legs", "Head", "Feet"],
        correct: 0,
      },
      {
        question: "How many sports were included in the 2008 Summer Olympics?",
        answers: ["28", "30", "32", "34"],
        correct: 0,
      },
      {
        question:
          "How old was Tiger Woods when he won the Masters?",
        answers: ["21", "25", "30", "35"],
        correct: 0,
      },
      {
        question:
          "How many Olympic games were held in countries that no longer exist?",
        answers: ["1", "2", "3", "4"],
        correct: 2,
      },
      {
        question: "What NFL team was originally called the ‘New York Titans’?",
        answers: [" The New York Jets.", " The USA Jets.", " The Nigeria Jets.", " The  london Jets."],
        correct: 0,
      },
      {
        question: "How much does an NFL football weigh?",
        answers: [
          "1 pound",
          "2 pounds",
          "3 pounds",
          "5 pounds",
        ],
        correct: 0,
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
  // Reset
  clearInterval(timer);
  timeLeft = totalTime;
  timeLeftText.innerText = timeLeft;
  // Full circle length is stroke-dasharray (283). We compute offset from remaining fraction.
  timerCircle.style.strokeDashoffset = '0';

  timer = setInterval(() => {
    timeLeft--;
    timeLeftText.innerText = timeLeft;

    // Update timer circle: offset increases as time elapses
    const fraction = 1 - timeLeft / totalTime; // 0 -> 1
    const offset = Math.round(fraction * 283);
    timerCircle.style.strokeDashoffset = `${offset}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// End Quiz
function endQuiz() {
  if (quizEnded) return;
  quizEnded = true;
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
  // Show actual elapsed time used during the quiz
  let elapsedMs = 0;
  if (quizStartTime) {
    elapsedMs = Date.now() - quizStartTime;
  }
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  finalTime.innerText = `Time Used: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

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
  // Reset any timers and start-time to avoid stale state
  clearInterval(timer);
  quizStartTime = null;
  timeLeft = totalTime;
  quizEnded = false; // allow quiz to end again on next play
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

// Clear Scoreboard
function clearScoreboard() {
  if (!confirm("Clear all saved scores? This cannot be undone.")) return;
  localStorage.removeItem("scoreboard");
  scoreboard = [];
  displayScoreboard();
}

// Update Scoreboard
function updateScoreboard(category, difficulty, score) {
  // Merge with any existing stored scoreboard to avoid overwriting previous entries
  const stored = localStorage.getItem("scoreboard");
  const current = stored ? JSON.parse(stored) : [];
  // Attach a timestamp and normalize the score to a 1-100 scale
  const total = (typeof questions !== 'undefined' && questions && questions.length) ? questions.length : 10;
  // Calculate percent, round, then clamp to 0..100
  let percent = Math.round((score / total) * 100);
  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;
  // Store normalized score (0-100), but keep raw score and total for reference
  const entry = {
    category,
    difficulty,
    score: percent,
    rawScore: score,
    total,
    when: new Date().toISOString(),
  };
  current.push(entry);
  // Sort by newest first (most recent entries first).
  // Use Date.parse with a fallback to 0 to avoid NaN when `when` is missing or malformed.
  current.sort((a, b) => (Date.parse(b.when) || 0) - (Date.parse(a.when) || 0));
  // Keep every score (do not trim)
  localStorage.setItem("scoreboard", JSON.stringify(current)); // Save all entries to local storage
  scoreboard = current;
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
          <div>When</div>
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
    const whenText = entry.when ? new Date(entry.when).toLocaleString() : "-";
    row.innerHTML = `
            <div>${entry.category}</div>
            <div>${entry.difficulty}</div>
            <div>${entry.score}</div>
            <div>${whenText}</div>
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
// Back to menu button while in quiz
const quizBackBtn = document.getElementById("quizBackToMenu");
if (quizBackBtn) {
  quizBackBtn.addEventListener("click", () => {
    // Stop quiz and return to main menu
    clearInterval(timer);
    isQuizActive = false;
    quizEnded = false;
    document.getElementById("quizGame").classList.add("hidden");
    document.getElementById("mainMenu").classList.remove("hidden");
  });
}
document.getElementById("playAgain").addEventListener("click", playAgain);
document.getElementById("backToMenu").addEventListener("click", playAgain); // If you want Main Menu to behave like Play Again
document
  .getElementById("closeScoreboard")
  .addEventListener("click", closeScoreboard);
// Clear scoreboard button (may not exist in older HTML)
const clearBtn = document.getElementById("clearScoreboardBtn");
if (clearBtn) {
  clearBtn.addEventListener("click", clearScoreboard);
}
