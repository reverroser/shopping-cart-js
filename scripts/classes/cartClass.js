/**
 * @class Cart
 */
function Cart() {
    this.products = JSON.parse(localStorage.getItem('cart')) || [];
    this.addProduct = function (productId, properties) {
        var cartCountEl = document.getElementById('cartCount');
        this.products.push({
            id: productId,
            properties,
        });
        localStorage.setItem('cart', JSON.stringify(this.products));
        cartCountEl.innerHTML = this.products.length;
    }
    this.getSelectedProductsById = function (id) {
        return this.products.filter(function (product) {
            return product.id === id;
        });
    }
}