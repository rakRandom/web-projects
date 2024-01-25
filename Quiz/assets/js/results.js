function show_results(right_answers, total_questions) {
    const main_div = $("#main");
    const results_div = $("#results-div");
    const results_title = $(".results-title");

    main_div.style.display = "none";
    results_div.style.display = "flex";
    results_title.innerText = `${right_answers}/${total_questions}`;
}
