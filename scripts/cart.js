"use strict"

const NAME_CART = "Scammer`s Shop Cart";

//Записываем данные в хранилище
function setCartData(obj) {
    localStorage.setItem(NAME_CART, JSON.stringify(obj));
    return false;
}
//Получаем данные из хранилища
function getCartData() {
    return JSON.parse(localStorage.getItem(NAME_CART));
}
//Очищаем хранилище с корзиной
export function clearCart(cart, element, itemBuy) {
    localStorage.removeItem(NAME_CART);
    renderCart(cart, element, itemBuy);
    cartItemCount(element);
    showItemCart(itemBuy);
}
//Добавляем товар в корзину
export function addToCart(e, title, price, element, itemBuy) {
    let target = e.target;
    target.disabled = true;
    const cartData = getCartData() || {};
    let itemId = target.dataset.id;
    let parentBox = target.parentElement;
    let itemTitle = parentBox.querySelector(title).textContent;
    let itemPrice = parentBox.querySelector(price).textContent;
    let itemImage = parentBox.querySelector("img").src;
    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = [itemTitle, itemPrice, itemImage];
    };
    target.disabled = setCartData(cartData);
    cartItemCount(element);
    const alertProduct = document.createElement("div");
    alertProduct.innerHTML = `<p><span>${itemTitle}</span> added to cart</p>`;
    alertProduct.className = `alert-product wrap`;
    document.body.append(alertProduct);
    setTimeout(() => alertProduct.remove(), 2000);
    showItemCart(itemBuy);
}
//удаляем товар из корзины(по одному)
function deleteItemCart(cart, element, itemBuy) {
    let cartData = getCartData();
    let itemID = event.target.dataset.id;
    delete cartData[itemID];
    setCartData(cartData);
    renderCart(cart, element, itemBuy);
    cartItemCount(element);
    showItemCart(itemBuy);
}
function addEventDelete(cart, element, itemBuy) {
    document.querySelectorAll(".deleter")
        .forEach((btn) => {
            btn.addEventListener("click", deleteItemCart.bind(this, cart, element, itemBuy));
        });
}
//Отрисовка корзины
export function renderCart(cart, element, itemBuy) {
    const cartData = getCartData();
    let totalItems;
    let totalAmount = 0;
    if (!cartData || Object.keys(cartData).length === 0) {
        totalItems = `<p>Корзина пуста!</p>`;
    } else {
        totalItems = "<table class='cart__table'><thead><tr><td>Title</td><td>Price</td></tr></thead><tbody>";
        for (const item in cartData) {
            totalAmount += +cartData[item][1];
            totalItems += "<tr>";
            for (let i = 0; i < cartData[item].length; i++) {
                if (i === 2) {
                    totalItems += `<td style="background-image: url(${cartData[item][i]})" class="cart__image"></td>`
                } else {
                    totalItems += `<td>${cartData[item][i]}</td>`;
                }
            };
            totalItems += `<td><button class="deleter" data-id=${item}>Delete</button></td></tr>`
        };
        totalItems += `</tbody></table>`
        totalItems += `<p>Total Amount: ${totalAmount}</p>`
    }
    cart.innerHTML = totalItems;
    addEventDelete(cart, element, itemBuy);
}
//Количество элементов в корзине
export function cartItemCount(element) {
    const cartData = getCartData();
    let totalItems;
    if (cartData) {
        totalItems = Object.keys(cartData).length;
    } else {
        totalItems = 0;
    }
    element.textContent = totalItems;
}
//Добавлен ли товар в корзину
export function showItemCart(itemBuy) {
    const cartData = getCartData();
    itemBuy.forEach(btn => {
        if (cartData && cartData.hasOwnProperty(btn.dataset.id)) {
            btn.textContent = "Already added";
            btn.classList.add("show-item");
        } else {
            btn.textContent = "Add to cart";
            btn.classList.remove("show-item");
        }
    });
}
export function createItemPage(e) {
    if (e.target.tagName == "BUTTON") return;
    const itemPage = document.createElement("div");
    itemPage.className = "item-page";
    itemPage.innerHTML = `
    <div class="container item-page__content">
        <h1>${this.querySelector(".products__title").textContent}</h1>
        <div class="item-page__img" style="background-image: url(${this.querySelector("img").src});"></div>
        <p class="item-page__info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptas nobis molestias iure aliquam incidunt! Praesentium odit itaque quibusdam expedita similique voluptas vero, consectetur, sequi, dolores minus sapiente porro magnam ratione distinctio molestiae quidem placeat impedit molestias ipsa deserunt autem nulla! Odit minus, maiores in eveniet amet deserunt eos temporibus vel harum, nostrum hic tempora non id soluta. In, accusamus beatae doloremque, laudantium perferendis minus assumenda tenetur amet laborum unde non fugiat? Eveniet ea dolor aliquid maxime temporibus? Reiciendis vitae magni alias sint repellendus minima iste repellat molestiae? Eius, id rerum mollitia laboriosam reiciendis adipisci inventore expedita quam sed quia. Sit facilis iusto beatae. Cumque qui molestias sint totam adipisci quibusdam doloribus ea nulla exercitationem odio libero ipsum repellat reiciendis perspiciatis a nobis deleniti dolorem sit eaque repudiandae dolor, maxime eius. Praesentium rerum ut, repudiandae optio deleniti voluptas magni aliquam repellat iure tenetur dolor blanditiis quos quam repellendus sequi tempora illo cum expedita nesciunt mollitia velit sapiente! Fugiat quos reprehenderit perspiciatis possimus voluptatibus dignissimos quia delectus labore ex doloremque quis ullam hic dolorum corrupti mollitia omnis maxime veniam minima, est adipisci doloribus saepe! Doloribus laborum quia, impedit sint veniam blanditiis voluptatem eaque. A quidem aspernatur optio quam voluptatem nulla nam sed dolore assumenda mollitia, tenetur vero dignissimos doloremque? Odio reprehenderit aperiam corporis consequatur soluta magni incidunt obcaecati, vero nobis molestiae harum tenetur quas, similique Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptas nobis molestias iure aliquam incidunt! Praesentium odit itaque quibusdam expedita similique voluptas vero, consectetur, sequi, dolores minus sapiente porro magnam ratione distinctio molestiae quidem placeat impedit molestias ipsa deserunt autem nulla! Odit minus, maiores in eveniet amet deserunt eos temporibus vel harum, nostrum</p>
        <span id="item-close" class="item-page__close">Back</span>
    </div>
    `;
    document.body.append(itemPage);
    document.getElementById("item-close")
        .addEventListener("click", () => {
            itemPage.remove()
            document.body.style.overflow = "auto";
        });
    const img = document.querySelector(".item-page__img");
    img.addEventListener("mousemove", e => {
        img.style.backgroundPositionX = -e.offsetX + 50 + "px";
        img.style.backgroundPositionY = -e.offsetY + 50 + "px";
    })
}




export class CartShop extends HTMLElement {
    //браузер вызовет этот метод при добавлении элемента в документ
    connectedCallback() {
        this.innerHTML = `
                <div id="modal" class="modal wrap">
                    <div class="cart">
                        <div id="cartContent" class="cart__content"></div>
                        <span id="cartClose" class="cart__close"></span>
                        <button id="clearCart" class="cart__clear">clear</button>
                    </div>
                </div>
        `;
    }
}