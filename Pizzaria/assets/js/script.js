const $=e=>document.querySelector(e);
const $$=e=>document.querySelectorAll(e);

let pizzaQt = 1;
let pizzaKey = null;
let cart = [];


// Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = $(".models .pizza-item").cloneNode(true);
    let $p = e=>pizzaItem.querySelector(e);
    pizzaQt = 1;

    pizzaItem.setAttribute("data-key", index)
    $p(".pizza-item--img img").src = item.img;
    $p(".pizza-item--name").innerText = item.name;
    $p(".pizza-item--price").innerText = `R$ ${item.price.toFixed(2)}`;
    $p(".pizza-item--desc").innerText = item.description;
    $p("a").addEventListener("click", e => {
        e.preventDefault();
        let pizzaWindowArea = $(".pizzaWindowArea");
        pizzaKey = parseInt(e.target.closest(".pizza-item").getAttribute("data-key"));
        const {img, name, description, sizes, price} = pizzaJson[pizzaKey];
        
        $(".pizzaBig img").src = img;
        $(".pizzaInfo h1").innerText = name;
        $(".pizzaInfo--desc").innerText = description;
        $(".pizzaInfo--actualPrice").innerText = `R$ ${price.toFixed(2)}`;

        for (let i in $$(".pizzaInfo--size span"))
            $$(".pizzaInfo--size span")[i].innerText = sizes[i];
        
        $(".pizzaInfo--qt").innerText = pizzaQt;

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


function updateCart() {
    $(".menu-openner span").innerText = cart.length;

    if (cart.length > 0){
        $("aside").classList.add("show");
        $(".cart").innerHTML = '';
        let subtotal = 0;
        let discount = 0;
        let total = 0;

        for (let pizzaInCart of cart){
            let pizzaItem = pizzaJson[pizzaInCart.id];
            let cartItem = $(".models .cart--item").cloneNode(true);
            let $c = name=>cartItem.querySelector(name);
            subtotal += pizzaItem.price * pizzaInCart.qt;

            $c("img").src = pizzaItem.img;
            $c(".cart--item-nome").innerText = `${pizzaItem.name} (${['P', 'M', 'G'][pizzaInCart.size]})`;
            $c(".cart--item--qt").innerText = pizzaInCart.qt;

            $c(".cart--item-qtmenos").addEventListener("click", () => {
                if (pizzaInCart.qt == 1){
                    cart.splice(cart.findIndex(val => val.id == pizzaInCart.id), 1)
                }
                else {
                    pizzaInCart.qt--;
                }
                updateCart();
            });

            $c(".cart--item-qtmais").addEventListener("click", () => {
                if (pizzaInCart.qt < 99)
                    pizzaInCart.qt++;
                updateCart();
            });

            $(".cart").append(cartItem);
        }
        
        subtotal = subtotal.toFixed(2);
        discount = (parseFloat(subtotal) / 10).toFixed(2)
        total = (parseFloat(subtotal) - parseFloat(discount)).toFixed(2)

        $("#cart--subtotal").innerText = `R$ ${subtotal}`;
        $("#cart--discount").innerText = `R$ ${discount}`;
        $("#cart--total").innerText = `R$ ${total}`;

    }else
        $("aside").classList.remove("show");
}


$(".pizzaInfo--cancelMobileButton").addEventListener("click", hideInfo);
$(".pizzaInfo--cancelButton").addEventListener("click", hideInfo);

// Add pizza to cart
$(".pizzaInfo--addButton").addEventListener("click", () => {
    hideInfo();
    let pizzaSize = parseInt($(".pizzaInfo--size.selected").getAttribute("data-key"));
    let copiedPizza = cart.find(item => item.id === pizzaKey);

    if (copiedPizza === undefined || copiedPizza.size !== pizzaSize)
        cart.push({
            id: pizzaKey,
            size: pizzaSize,
            qt: pizzaQt
        });
    else if (copiedPizza.size === pizzaSize)
        copiedPizza.qt += pizzaQt;

    updateCart();
});

// Plus and minus buttons at pizza info
$(".pizzaInfo--qtmenos").addEventListener("click", () => {
    pizzaQt = (pizzaQt > 1) ? pizzaQt-1 : pizzaQt;
    $(".pizzaInfo--qt").innerText = pizzaQt;
});
$(".pizzaInfo--qtmais").addEventListener("click", () => {
    pizzaQt = (pizzaQt < 99) ? pizzaQt+1 : pizzaQt;
    $(".pizzaInfo--qt").innerText = pizzaQt;
});

// Pizza size selection
for (let size of $$(".pizzaInfo--size"))
    size.addEventListener("click", () => {
        $(".pizzaInfo--size.selected").classList.remove("selected"); 
        size.classList.add("selected");
    });

// Menu Opener (mobile)
$(".menu-openner").addEventListener("click", () => {
    if (cart.length > 0)
        $("aside").style.left = 0;
    updateCart();
})

// Menu Closer (mobile)
$(".menu-closer").addEventListener("click", () => {
    $("aside").style.left = "100vw";
    updateCart();
})

// Buy Button
$(".cart--finalizar").addEventListener("click", () => {
    cart = [];
    $("aside").style.left = "100vw";
    updateCart();
})