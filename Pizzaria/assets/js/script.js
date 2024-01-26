const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

let pizzaQt = 1;

$(".pizzaInfo--cancelMobileButton").addEventListener("click", hideInfo);
$(".pizzaInfo--cancelButton").addEventListener("click", hideInfo);
$(".pizzaInfo--addButton").addEventListener("click", hideInfo);

// Plus and minus buttons at pizza info
$(".pizzaInfo--qtmenos").addEventListener("click", () => {
    pizzaQt = (pizzaQt > 1) ? pizzaQt-1 : pizzaQt;
    $(".pizzaInfo--qt").innerText = pizzaQt;
});
$(".pizzaInfo--qtmais").addEventListener("click", () => {
    pizzaQt = (pizzaQt < 99) ? pizzaQt+1 : pizzaQt;
    $(".pizzaInfo--qt").innerText = pizzaQt;
});

// Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = $(".models .pizza-item").cloneNode(true);
    let p$ = e=>pizzaItem.querySelector(e);
    pizzaQt = 1;

    pizzaItem.setAttribute("data-key", index)
    p$(".pizza-item--img img").src = item.img;
    p$(".pizza-item--name").innerText = item.name;
    p$(".pizza-item--price").innerText = `R$ ${item.price.toFixed(2)}`;
    p$(".pizza-item--desc").innerText = item.description;
    p$("a").addEventListener("click", e => {
        e.preventDefault();
        let pizzaWindowArea = $(".pizzaWindowArea");
        let key = e.target.closest(".pizza-item").getAttribute("data-key");
        const {img, name, description, sizes, price} = pizzaJson[key];
        
        $(".pizzaBig img").src = img;
        $(".pizzaInfo h1").innerText = name;
        $(".pizzaInfo--desc").innerText = description;
        $(".pizzaInfo--actualPrice").innerText = `R$ ${price.toFixed(2)}`;
        for (let i in $$(".pizzaInfo--size span"))
            $$(".pizzaInfo--size span")[i].innerText = sizes[i];
        for (let size of $$(".pizzaInfo--size"))
            size.addEventListener("click", (e) => {
                $(".selected").classList.remove("selected"); 
                e.currentTarget.classList.add("selected");
            });
        
        $(".pizzaInfo--qt").innerText = pizzaQt;
        // $("")
        // $("")
        // $("")
        // $("")
        // $("")

        pizzaWindowArea.style.opacity = 0;
        pizzaWindowArea.style.display = "flex";
        setTimeout(() => {
            pizzaWindowArea.style.opacity = 1;
        }, 50);
    });
    
    $(".pizza-area").append(pizzaItem);
});


// Eventos da InfoArea
function hideInfo() {
    let pizzaWindowArea = $(".pizzaWindowArea");
    setTimeout(() => {
        pizzaWindowArea.style.opacity = 0;
        pizzaWindowArea.style.display = "none";
    }, 50);
}
