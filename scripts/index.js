"use strict"

import { renderCart, clearCart as clearCartFunc, addToCart, cartItemCount, showItemCart, CartShop, createItemPage } from "./cart.js";
import { HeaderMenu } from "./headerMenu.js";

//регистрируем веб-компонент
customElements.define("header-menu", HeaderMenu);
customElements.define("cart-shop", CartShop);

const cartClose = document.getElementById("cartClose");
const modal = document.getElementById("modal");
const cartOpenIcon = document.getElementById("cartOpenIcon");
const itemBuy = document.querySelectorAll(".products__buy");
const cartContent = document.getElementById("cartContent");
const clearCart = document.getElementById("clearCart");
const cartCount = document.getElementById("cartCount");
const productItems = document.querySelectorAll(".products__item");

cartItemCount(cartCount);

showItemCart(itemBuy);
cartClose.addEventListener("click", () => {
    modal.style.display = "none";
    if(!document.querySelector(".item-page")){
        document.body.style.overflow = "auto";
    }
});
cartOpenIcon.addEventListener("click", () => {
    renderCart(cartContent, cartCount, itemBuy);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
});
clearCart.addEventListener("click", clearCartFunc.bind(this, cartContent, cartCount, itemBuy));
itemBuy.forEach(btn => {
    btn.addEventListener("click", e => addToCart(e, ".products__title", ".products__price", cartCount, itemBuy));
});
productItems.forEach(item => {
    item.addEventListener("click", createItemPage);
    item.addEventListener("click", () => {
        document.body.style.overflow = "hidden";
    })
});
