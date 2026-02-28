const questions = [
    {
        q: "Which language is used for web development?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: 1
    },
    {
        q: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: 1
    },
    {
        q: "Which is not a programming language?",
        options: ["Java", "Python", "HTML", "C"],
        answer: 2
    },
     {
        q: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyperlinking Text Marking Language"
        ],
        answer: 0
    }
];

let index = 0;
let selected = new Array(questions.length).fill(null);
let submitted = false;
let timerInterval;

// ---------------- LOAD QUESTION ----------------
function loadQuestion() {

    const questionElement = document.getElementById("question");
    const spans = document.querySelectorAll(".options span");
    const radios = document.querySelectorAll("input[name='option']");

    questionElement.innerText =
        `Q${index + 1}. ${questions[index].q}`;

    spans.forEach((span, i) => {
        span.innerText = questions[index].options[i];
    });

    radios.forEach(radio => {
        radio.checked = false;
        radio.disabled = submitted;
    });

    if (selected[index] !== null) {
        radios[selected[index]].checked = true;
    }
}

// ---------------- SAVE ANSWER ----------------
function saveAnswer() {
    const checked = document.querySelector("input[name='option']:checked");
    if (checked) {
        selected[index] = parseInt(checked.value);
    }
}

// ---------------- NEXT ----------------
function nextQuestion() {
    if (submitted) return;
    saveAnswer();
    if (index < questions.length - 1) {
        index++;
        loadQuestion();
    }
}

// ---------------- PREVIOUS ----------------
function prevQuestion() {
    if (submitted) return;
    saveAnswer();
    if (index > 0) {
        index--;
        loadQuestion();
    }
}

// ---------------- SUBMIT QUIZ ----------------
function submitQuiz() {

    if (submitted) return;

    saveAnswer();
    submitted = true;
    clearInterval(timerInterval);

    let score = 0;
    let correct = 0;
    let wrong = 0;
    let attempted = 0;

    selected.forEach((ans, i) => {
        if (ans !== null) {
            attempted++;
            if (ans === questions[i].answer) {
                score++;
                correct++;
            } else {
                wrong++;
            }
        }
    });

    showResult(score, correct, wrong, attempted);
}

// ---------------- SHOW RESULT ----------------
function showResult(score, correct, wrong, attempted) {

    const quizDiv = document.getElementById("quiz");

    quizDiv.innerHTML = `
        <h2>Test Result</h2>
        <p><strong>Total Questions:</strong> ${questions.length}</p>
        <p><strong>Attempted:</strong> ${attempted}</p>
        <p><strong>Correct:</strong> ${correct}</p>
        <p><strong>Wrong:</strong> ${wrong}</p>
        <p><strong>Score:</strong> ${score} / ${questions.length}</p>
        <hr>
    `;

    questions.forEach((q, i) => {

        const userAns =
            selected[i] !== null
                ? q.options[selected[i]]
                : "Not Attempted";

        const correctAns = q.options[q.answer];

        quizDiv.innerHTML += `
            <div style="margin-bottom:15px;">
                <p><strong>Q${i + 1}. ${q.q}</strong></p>
                <p>Your Answer: 
                    <span style="color:${selected[i] === q.answer ? "green" : "red"}">
                        ${userAns}
                    </span>
                </p>
                <p>Correct Answer: 
                    <span style="color:green">
                        ${correctAns}
                    </span>
                </p>
            </div>
        `;
    });

    // Disable buttons
    document.querySelectorAll(".buttons button")
        .forEach(btn => btn.disabled = true);
}

// ---------------- TIMER ----------------
let time = 10 * 60; // 10 minutes

function startTimer() {

    timerInterval = setInterval(() => {

        let min = Math.floor(time / 60);
        let sec = time % 60;

        document.getElementById("time").innerText =
            `${min}:${sec < 10 ? "0" : ""}${sec}`;

        time--;

        if (time < 0) {
            submitQuiz(); // auto submit
        }

    }, 1000);
}

// ---------------- INIT ----------------
loadQuestion();
startTimer();
