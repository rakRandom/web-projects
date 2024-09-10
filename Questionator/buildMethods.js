function buildAlternative(question, container) {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    
    title.innerText = question.title;

    div.appendChild(title);

    question.body.forEach(alternative => {
        const opt = document.createElement("input");
        opt.name = question.title.slice(0, 10);
        opt.type = "radio";
        opt.id = alternative;

        const label = document.createElement("label");
        label.for = alternative;
        label.innerText = alternative;
        
        div.appendChild(opt);
        div.appendChild(label);
        div.appendChild(document.createElement("br"));
    });

    container.appendChild(div);

    return true;
}

function buildDissertative(question, container) {
    const div = document.createElement("div");
    const title = document.createElement("h2");

    title.innerText = question.title;

    const textArea = document.createElement("textarea");

    div.appendChild(title);
    div.appendChild(textArea);

    container.appendChild(div);

    return true;
}

function buildRelational(question, container) {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    
    title.innerText = question.title;

    div.appendChild(title);

    question.body.statements.forEach((statement, i) => {
        const text = document.createElement("p");
        text.innerText = `${i + 1} - ${statement}`;

        div.appendChild(text);
    });

    div.appendChild(document.createElement("br"));

    question.body.alternatives.forEach(alternative => {
        const opt = document.createElement("input");
        opt.type = "text";
        opt.id = alternative;

        const label = document.createElement("label");
        label.for = alternative;
        label.innerText = alternative;
        
        div.appendChild(opt);
        div.appendChild(label);
        div.appendChild(document.createElement("br"));
    });

    container.appendChild(div);

    return true;
}

function buildFactual(question, container) {
    const div = document.createElement("div");
    const title = document.createElement("h2");
    
    title.innerText = question.title;

    div.appendChild(title);

    question.body.statements.forEach((statement, i) => {
        const text = document.createElement("p");
        text.innerText = `${i + 1} - ${statement}`;

        div.appendChild(text);
    });

    div.appendChild(document.createElement("br"));

    question.body.alternatives.forEach(alternative => {
        const opt = document.createElement("input");
        opt.name = question.title.slice(0, 10);
        opt.type = "radio";
        opt.id = alternative;

        const label = document.createElement("label");
        label.for = alternative;
        label.innerText = alternative;
        
        div.appendChild(opt);
        div.appendChild(label);
        div.appendChild(document.createElement("br"));
    });

    container.appendChild(div);

    return true;
}
