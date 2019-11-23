/**
 * @class Cart
 */
function Cart() {
    this.products = JSON.parse(localStorage.getItem('cart')) || [];
    this.addProduct = function (product) {
        var cartCountEl = document.getElementById('cartCount');
        // TODO: Add product selected props and save it in localStorage
        this.products.push(product);
        cartCountEl.innerHTML = this.products.length;
    }
}