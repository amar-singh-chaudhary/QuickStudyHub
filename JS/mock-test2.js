// Correct Answers
const answers = {
    q1: "12",
    q2: "12"
};

let timeLeft = 60; // 60 seconds
let timer = setInterval(updateTimer, 1000);

function updateTimer() {
    document.getElementById("time").textContent = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timer);
        submitTest();
    }
}

function submitTest() {

    clearInterval(timer); // stop timer
    let score = 0;

    for (let key in answers) {

        let selected = document.querySelector(`input[name="${key}"]:checked`);
        let userAnswer = selected ? selected.value : "Not Answered";
        let correctAnswer = answers[key];

        let answerBox = document.getElementById("answer-" + key);

        if (userAnswer === correctAnswer) {
            score++;
            answerBox.innerHTML =
                `<div class="correct">
                    Your Answer: ${userAnswer} ✓ <br>
                    Correct Answer: ${correctAnswer}
                 </div>`;
        } else {
            answerBox.innerHTML =
                `<div class="wrong">
                    Your Answer: ${userAnswer} ❌ <br>
                    Correct Answer: ${correctAnswer}
                 </div>`;
        }

        // Disable all radio buttons
        let options = document.getElementsByName(key);
        options.forEach(option => option.disabled = true);
    }

    document.getElementById("score").textContent =
        "Total Score: " + score + " / " + Object.keys(answers).length;

    document.getElementById("submitBtn").disabled = true;
}
