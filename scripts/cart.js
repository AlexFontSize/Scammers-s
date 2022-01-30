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
export function clearCart(cart, element) {
    localStorage.removeItem(NAME_CART);
    renderCart(cart, element);
    cartItemCount(element);
}
//Добавляем товар в корзину
export function addToCart(e, title, price, element) {
    let target = e.target;
    target.disabled = true;
    const cartData = getCartData() || {};
    let itemId = target.dataset.id;
    let parentBox = target.parentElement;
    let itemTitle = parentBox.querySelector(title).textContent;
    let itemPrice = parentBox.querySelector(price).textContent;
    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = [itemTitle, itemPrice];
    };
    target.disabled = setCartData(cartData);
    cartItemCount(element);
}
//удаляем товар из корзины(по одному)
function deleteItemCart(cart, element) {
    let cartData = getCartData();
    let itemID = event.target.dataset.id;
    delete cartData[itemID];
    setCartData(cartData);
    renderCart(cart, element);
    cartItemCount(element);
}
function addEventDelete(cart, element) {
    document.querySelectorAll(".deleter")
        .forEach((btn) => {
            btn.addEventListener("click", deleteItemCart.bind(this, cart, element));
        });
}
//Отрисовка корзины
export function renderCart(cart, element) {
    const cartData = getCartData();
    if (cartData !== null) {
        let totalItems = "<table><thead><tr><td>Title</td><td>Price</td></tr></thead><tbody>";
        for (const item in cartData) {
            totalItems += "<tr>";
            for (let i = 0; i < cartData[item].length; i++) {
                totalItems += `<td>${cartData[item][i]}</td>`;
            };
            totalItems += `<td><button class="deleter" data-id=${item}>Delete</button></td></tr>`
        };
        totalItems += `</tbody></table>`
        cart.innerHTML = totalItems;
        addEventDelete(cart, element);
    }
    if (cartData === null || Object.keys(cartData).length === 0) {
        let zeroItems = `<p>Корзина пуста!</p>`;
        cart.innerHTML = zeroItems;
    };
}
//Количество элементов в корзине
export function cartItemCount(element){
    const cartData = getCartData();
    let totalItems;
    if (cartData){
        totalItems = Object.keys(cartData).length;
    } else{
        totalItems = 0;
    }
    element.textContent = totalItems;
}