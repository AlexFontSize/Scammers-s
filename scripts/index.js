"use strict"

import { renderCart, clearCart as clearCartFunc, addToCart, cartItemCount } from "./cart.js";

const cartClose = document.getElementById("cartClose");
const modal = document.getElementById("modal");
const cartOpenIcon = document.getElementById("cartOpenIcon");
const itemBuy = document.querySelectorAll(".products__buy");
const cartContent = document.getElementById("cartContent");
const clearCart = document.getElementById("clearCart");
const cartCount = document.getElementById("cartCount");

cartItemCount(cartCount);

cartClose.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});
cartOpenIcon.addEventListener("click", () => {
    renderCart(cartContent, cartCount);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
});
clearCart.addEventListener("click", clearCartFunc.bind(this, cartContent, cartCount));
itemBuy.forEach(btn => {
    btn.addEventListener("click", e => addToCart(e, ".products__title", ".products__price", cartCount));
});
