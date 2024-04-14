"use strict";
const $ = (query) => document.querySelector(query);
const productsList = $("#products-list");
const inputSearch = $("#input-search");
const inputQt = $("#input-qt");
const inputName = $("#input-name");
const inputValue = $("#input-value");
const outputValue = $("#output-value");
const outputQt = $("#output-qt");
const buttonAdd = $("#button-add");
let totalValue = 0;
let totalQt = 0;
inputSearch === null || inputSearch === void 0 ? void 0 : inputSearch.addEventListener("keyup", (e) => {
    if (e.code == "Enter") {
        searchItem();
    }
});
buttonAdd === null || buttonAdd === void 0 ? void 0 : buttonAdd.addEventListener("click", appendProduct);
function appendProduct() {
    var _a;
    if (isNaN(parseInt(inputQt.value))) {
        inputQt.value = "1";
    }
    if (inputName.value == "") {
        alert("Digite o nome do produto");
        return;
    }
    if (isNaN(parseFloat(inputValue.value.replace(',', '.')))) {
        alert("Digite o preço do produto corretamente.");
        return;
    }
    let productQt = parseInt(inputQt.value).toString();
    let productName = inputName.value;
    let productValue = (parseFloat(inputValue.value.replace(',', '.')) * parseInt(productQt)).toFixed(2);
    let itemModel = (_a = $("#items-model")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
    let newId = "id" + Math.random().toString().replace('.', '');
    itemModel.id = newId;
    let modelQt = itemModel.querySelector("#qt");
    let modelName = itemModel.querySelector("#name");
    let modelValue = itemModel.querySelector("#value");
    let modelButton = itemModel.querySelector("#close-button");
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
function removeProduct(itemId, value, qt) {
    var _a;
    (_a = productsList.querySelector(`#${itemId}`)) === null || _a === void 0 ? void 0 : _a.remove();
    updateVariables(-value, -qt);
    updateOutput();
}
function updateVariables(value, qt) {
    totalValue += value;
    totalQt += qt;
}
function updateOutput() {
    outputValue.innerText = totalValue.toFixed(2);
    outputQt.innerText = totalQt.toFixed(0);
}
function searchItem() {
    let nameToSearch = inputSearch.value.trim().toLowerCase();
    let itemsNameList = [];
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
