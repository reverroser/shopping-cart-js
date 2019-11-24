/**
 * @class Cart
 */
function Cart() {
    // This is needed to get the up to date value from localStorage
    this.getProducts = function () {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }
    this.addProduct = function (product, properties) {
        var products = this.getProducts();
        product.selectedProperties = properties;
        products.push(product);
        localStorage.setItem('cart', JSON.stringify(products));
        this.updateBadge();
    }
    this.removeProduct = function (position) {
        var products = this.getProducts();
        // Filter out the products getting its position in the array
        var newProducts = products.filter(function (product, index) {
            return index !== position;
        });
        localStorage.setItem('cart', JSON.stringify(newProducts));
        this.updateBadge();
        this.render();
    }
    // Filters the array by the given product id
    this.getSelectedProductsById = function (id) {
        var products = this.getProducts();
        return products.filter(function (product) {
            return product.id === id;
        });
    }
    this.updateBadge = function () {
        var products = this.getProducts();
        var cartCountEl = document.getElementById('cartCount');
        cartCountEl.innerHTML = products.length;
    }
    this.render = function () {
        // This is needed to keep the value of this on the onclick function of the remove button
        var scope = this;
        var products = scope.getProducts();
        var cartProductsEl = document.getElementById('cartProducts');
        var totalPrice = 0;
        // Reset the view
        cartProductsEl.innerHTML = '';

        products.forEach(function (product, index) {
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
                <div>
                    ${productPrice}€
                    <button type="button" class="btn btn-danger btn-sm" id="remove-${product.id}">Remove</button>
                </div>
            `;

            cartProductsEl.appendChild(productEl);

            var removeButtonEl = document.getElementById(`remove-${product.id}`);
            removeButtonEl.onclick = function () {
                scope.removeProduct(index);
            };
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