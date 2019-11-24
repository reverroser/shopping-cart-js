/**
 * @class Cart
 */
function Cart() {
    this.products = JSON.parse(localStorage.getItem('cart')) || [];
    this.addProduct = function (product, properties) {
        product.selectedProperties = properties;
        this.products.push(product);
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
    this.render = function () {
        var cartProductsEl = document.getElementById('cartProducts');
        var totalPrice = 0;

        this.products.forEach(function (product) {
            var productEl = document.createElement('li');
            productEl.className = 'list-group-item d-flex justify-content-between align-items-center';

            var productQuantity = product.selectedProperties.quantity;
            var selectedProperty = product.properties[product.selectedProperties.size];
            var productPrice = selectedProperty.price.eur * productQuantity;
            totalPrice += productPrice;

            productEl.innerHTML = `
                <div>
                    ${product.name}
                    <div>
                        Quantity ${productQuantity}
                    </div>
                </div>
                <div>${productPrice}€</div>
            `;

            cartProductsEl.appendChild(productEl);
        });

        var cartTotalPriceEl = document.createElement('li');
        cartTotalPriceEl.className = 'list-group-item d-flex justify-content-between align-items-center';
        cartTotalPriceEl.innerHTML = `
            <div>Total:</div>
            <div>${totalPrice}€</div>
        `;
        cartProductsEl.appendChild(cartTotalPriceEl);
    }
}