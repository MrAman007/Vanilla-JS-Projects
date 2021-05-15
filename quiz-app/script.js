const quizData = [
    {
        question: "Best footballer in the world ?",
        options: ["Cristiano Ronaldo", "Zlatan", "Messi", "Van Dijk"],
        correct: 0,
    },
    {
        question: "Best cricketer in the world ?",
        options: ["Rohit Sharma", "Steve Smith", "Virat Kohli", "Ben Stokes"],
        correct: 2,
    },
    {
        question: "Best anime in the world ?",
        options: [
            "My hero academia",
            "Attack on titan",
            "Tokyo Ghoul",
            "Naruto",
        ],
        correct: 1,
    },
    {
        question: "Best programming language in the world ?",
        options: ["Java", "C++", "Javascript", "Python"],
        correct: "2",
    },
    {
        question: "Best country in the world ?",
        options: ["India", "Norway", "Germany", "Sweden"],
        correct: 0,
    },
];

const questionEl = document.querySelector(".question");
const optionLabelEls = document.querySelectorAll(".option-label");
const optionEls = document.querySelectorAll(".option");
const submitBtnEl = document.querySelector(".submit");

let quesIdx = 0,
    score = 0;
const loadQuestion = function () {
    //reset selection
    optionEls.forEach((e) => (e.checked = false));

    //load question
    questionEl.textContent = quizData[quesIdx].question;

    //load options
    optionLabelEls.forEach(
        (label, idx) => (label.textContent = quizData[quesIdx].options[idx])
    );
};

loadQuestion();

submitBtnEl.addEventListener("click", () => {
    let answer = undefined;
    optionEls.forEach((el) => {
        if (el.checked) {
            answer = el.id;
        }
    });

    if (answer) {
        //if correct answer, increase score
        if (answer == quizData[quesIdx].correct) score++;

        //load next question or show complete msg
        if (++quesIdx < quizData.length) loadQuestion();
        else {
            const quizContainerDiv = document.querySelector(".quiz-container");

            quizContainerDiv.innerHTML = `<h2 class="message"> You answered ${score} out of ${quizData.length} correctly.</h2>
            <button onClick="location.reload()">Reload</button> 
            `;
        }
    } else {
        alert("please choose an option");
    }
});
