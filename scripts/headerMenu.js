export class HeaderMenu extends HTMLElement {
    //браузер вызовет этот метод при добавлении элемента в документ
    connectedCallback() {
        this.innerHTML = `
            <header class="header">
                <h1>Scammer's shop</h1>
                <nav>
                    <ul class="menu">
                        <li><a href=${this.getAttribute("link-home")}>Home</a></li>
                        <li><a href=${this.getAttribute("link-phones")}>Phones</a></li>
                        <li><a href=${this.getAttribute("link-PC")}>PC</a></li>
                    </ul>
                </nav>
                <div class="header__cart">
                    <img id="cartOpenIcon" src=${this.getAttribute("cart-icon")}  alt="">
                    <span id="cartCount"></span>
                </div>
            </header>
        `;
    }
}