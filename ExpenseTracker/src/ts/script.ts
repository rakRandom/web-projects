// npx tailwindcss -i ./src/css/input.css -o ./dist/assets/css/output.css --watch

// tsc src/script.js --watchMode/-w
// tsc src/script.ts --outDir public

// Como não compilar se tiver erro:
// tsc script.ts --noEmitOnError

const $ = (query: string) => document.querySelector(query);

// HTML Elements
const productsList = $("#products-list") as HTMLUListElement;
const inputSearch = $("#input-search") as HTMLInputElement;
const inputQt = $("#input-qt") as HTMLInputElement;
const inputName = $("#input-name") as HTMLInputElement;
const inputValue = $("#input-value") as HTMLInputElement;
const outputValue = $("#output-value") as HTMLSpanElement;
const outputQt = $("#output-qt") as HTMLSpanElement;
const buttonAdd = $("#button-add") as HTMLButtonElement;

// Variables
let totalValue = 0;
let totalQt = 0;

// Event Listeners
inputSearch?.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
        searchItem();
    }
});

buttonAdd?.addEventListener("click", appendProduct);


// List Element functions
function appendProduct() {
    if (isNaN(parseInt(inputQt.value))) {
        inputQt.value = "1"
    }
    if (inputName.value == "") {
        alert("Digite o nome do produto");
        return;
    }
    if (isNaN(parseFloat(inputValue.value.replace(',', '.')))) {
        alert("Digite o preço do produto corretamente.");
        return;
    }

    let productQt: string = parseInt(inputQt.value).toString();
    let productName: string = inputName.value;
    let productValue: string = (parseFloat(inputValue.value.replace(',', '.')) * parseInt(productQt)).toFixed(2);

    let itemModel = $("#items-model")?.cloneNode(true) as HTMLElement;
    let newId = "id" + Math.random().toString().replace('.', '');
    itemModel.id = newId;
    
    let modelQt = itemModel.querySelector("#qt") as HTMLDivElement;
    let modelName = itemModel.querySelector("#name") as HTMLDivElement;
    let modelValue = itemModel.querySelector("#value") as HTMLDivElement;
    let modelButton = itemModel.querySelector("#close-button") as HTMLButtonElement;

    modelQt.innerText = productQt;
    modelName.innerText = productName;
    modelValue.innerText = `R$ ${productValue}`;

    modelButton.addEventListener("click", () => {
        removeProduct(newId, parseFloat(productValue), parseInt(productQt));
    });

    productsList.appendChild(itemModel);

    updateVariables(parseFloat(productValue), parseInt(productQt));
    updateOutput();
}


function removeProduct(itemId: string, value: number, qt: number) {
    productsList.querySelector(`#${itemId}`)?.remove();

    updateVariables(-value, -qt);
    updateOutput();
}


// Output functions
function updateVariables(value: number, qt: number) {
    totalValue += value;
    totalQt += qt;
}


function updateOutput() {
    outputValue.innerText = totalValue.toFixed(2);
    outputQt.innerText = totalQt.toFixed(0);
}


// Search functions
function searchItem() {
    let nameToSearch = inputSearch.value.trim().toLowerCase();
    let itemsNameList: Array<string> = [];

    for (let item of productsList.children) {
        let itemName = item.children[1].innerHTML.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        itemsNameList.push(itemName);
    }
    
    let index = itemsNameList.indexOf(nameToSearch);
    if (index != -1) {
        alert(`Posição: ${index + 1}`);
    }
    else {
        alert("Não está na lista.");
    }
}