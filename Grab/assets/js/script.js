// Query functions to write less code
const $ = name => document.querySelector(name);
const $_ = names => document.querySelectorAll(names);

// Drag short functions
let dragStarted = e => e.currentTarget.classList.add("dragged");
let dragEnded = e => e.currentTarget.classList.remove("dragged");
let dragLeave = e => e.currentTarget.classList.remove("drag-over");

$(".main").addEventListener("dragover",  e => dragOver(e, 3));
$(".main").addEventListener("dragleave", dragLeave);
$(".main").addEventListener("drop", e => {dragDrop(e, 3)});

// Adding event listeners
for (let item of $_(".item")){
    item.addEventListener("dragstart", dragStarted);
    item.addEventListener("dragend", dragEnded);
}

for (let area of $_(".area")){
    area.addEventListener("dragover", e => dragOver(e, 1));
    area.addEventListener("dragleave", dragLeave);
    area.addEventListener("drop", e => dragDrop(e, 1));
}


// Drag long functions
function dragOver(e, limit) {
    if (e.currentTarget.children.length < limit) {
        e.preventDefault();
        e.currentTarget.classList.add("drag-over");
    }
}

function dragDrop(e, limit) {
    e.currentTarget.classList.remove("drag-over");
    
    if (e.currentTarget.children.length < limit)
        e.currentTarget.appendChild($(".dragged"));
}

