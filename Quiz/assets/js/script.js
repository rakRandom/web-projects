const $ = name => document.querySelector(name);

const title = $(".title");
const question = $(".question");
const answer_list = [
    $("#answer1"),
    $("#answer2"),
    $("#answer3"),
    $("#answer4")
];

let question_list;
let total_questions;
let current_question = -1;
let right_answers = 0;

start();


async function start() {
    question_list = await fetch("./assets/data/questions.json").then(res => res.json());
    total_questions = question_list.length;

    for (let answer_index in answer_list)
        answer_list[answer_index].addEventListener("click", () => {calc_answer(answer_index)});

    next_question();
}


function calc_answer(answer_id) {
    let right_answer = question_list[current_question].right_answer;

    answer_list[right_answer].classList.toggle("right-answer");
    if (answer_id == right_answer)
        right_answers++;

    setTimeout(() => {
        next_question();
        answer_list[right_answer].classList.toggle("right-answer");
    }, 500);
}


function next_question() {
    current_question++;

    if (current_question == total_questions)
        show_results(right_answers, total_questions);
    else {
        title.innerText = `Pergunta ${current_question + 1}/${total_questions}`;
        question.innerText = question_list[current_question].head;

        for (let answer_index in answer_list)
            answer_list[answer_index].innerText = question_list[current_question].body[answer_index];
    }
}
