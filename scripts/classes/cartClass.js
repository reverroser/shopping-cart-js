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
        // This is needed to keep the value of this on the event handlers
        var scope = this;
        var products = scope.getProducts();
        var cartProductsEl = document.getElementById('cartProducts');
        var currency = new Currency();
        var currencyKey = currency.getCurrency();
        var currencySymbol = currency.getCurrencySymbol();
        var totalPrice = 0;
        // Reset the content of the view
        cartProductsEl.innerHTML = '';

        products.forEach(function (product, index) {
            var productEl = document.createElement('li');
            productEl.className = 'list-group-item d-flex justify-content-between align-items-center';

            var productQuantity = product.selectedProperties.quantity;
            var selectedProperty = product.properties[product.selectedProperties.size];
            var productPrice = selectedProperty.price[currencyKey] * productQuantity;
            totalPrice += productPrice;

            var productNameEl = document.createElement('div');
            productNameEl.innerHTML = product.name;
            var productQuantityEl = document.createElement('div');
            productQuantityEl.innerHTML = `Quantity ${productQuantity}`;
            productNameEl.appendChild(productQuantityEl);

            var productPriceEl = document.createElement('div');
            productPriceEl.innerHTML = `${productPrice}${currencySymbol}`;
            var removeButtonEl = document.createElement('button');
            removeButtonEl.type = 'button';
            removeButtonEl.className = 'btn btn-danger btn-sm';
            removeButtonEl.id = `remove-${product.id}`;
            removeButtonEl.innerHTML = 'Remove';
            removeButtonEl.onclick = function () {
                scope.removeProduct(index);
            };
            productPriceEl.appendChild(removeButtonEl);

            productEl.appendChild(productNameEl);
            productEl.appendChild(productPriceEl);
            cartProductsEl.appendChild(productEl);
        });

        var cartTotalPriceEl = document.createElement('li');
        cartTotalPriceEl.className = 'list-group-item d-flex justify-content-between align-items-center';
        cartTotalPriceEl.innerHTML = `
            <div>Total:</div>
            <div>${totalPrice}${currencySymbol}</div>
        `;
        cartProductsEl.appendChild(cartTotalPriceEl);

        // Listens the updateCurrency custom event and refresh the view
        document.addEventListener('updateCurrency', function () {
            scope.render();
        });
    }
}