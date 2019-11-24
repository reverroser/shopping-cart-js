/**
 * @class Cart
 */
function Cart() {
    this.products = JSON.parse(localStorage.getItem('cart')) || [];
    this.addProduct = function (productId, properties) {
        this.products.push({
            id: productId,
            properties,
        });
        localStorage.setItem('cart', JSON.stringify(this.products));
        this.updateBadge();
    }
    // Filters the array by the given product id
    this.getSelectedProductsById = function (id) {
        return this.products.filter(function (product) {
            return product.id === id;
        });
    }
    this.updateBadge = function () {
        var cartCountEl = document.getElementById('cartCount');
        cartCountEl.innerHTML = this.products.length;
    }
}