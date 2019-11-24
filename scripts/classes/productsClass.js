/**
 * @class Products
 * Description: This class return a list of products and a render funcition.
 * [note]: To be able to render the products you need to create first a div with the id `productsGrid`.
 */
function Products() {
    this.list = [
        new Product(
            'White rock',
            'lorem ipsum patatim',
            ['assets/whiterock.jpg'],
            [
                {
                    price: {
                        eur: 12,
                        dol: 14,
                    },
                    size: 'big',
                    stock: 10,
                },
                {
                    price: {
                        eur: 10,
                        dol: 12,
                    },
                    size: 'medium',
                    stock: 14,
                },
                {
                    price: {
                        eur: 8,
                        dol: 10,
                    },
                    size: 'small',
                    stock: 16,
                }
            ],
            '1'
        ),
        new Product(
            'Gray rock',
            'lorem ipsum patatim',
            ['assets/grayrock.jpg'],
            [
                {
                    price: {
                        eur: 12,
                        dol: 14,
                    },
                    size: 'big',
                    stock: 10,
                },
                {
                    price: {
                        eur: 10,
                        dol: 12,
                    },
                    size: 'medium',
                    stock: 14,
                },
                {
                    price: {
                        eur: 8,
                        dol: 10,
                    },
                    size: 'small',
                    stock: 16,
                }
            ],
            '2'
        ),
        new Product(
            'Black rock',
            'lorem ipsum patatim',
            ['assets/blackrock.jpg'],
            [
                {
                    price: {
                        eur: 12,
                        dol: 14,
                    },
                    size: 'big',
                    stock: 10,
                },
                {
                    price: {
                        eur: 10,
                        dol: 12,
                    },
                    size: 'medium',
                    stock: 14,
                },
                {
                    price: {
                        eur: 8,
                        dol: 10,
                    },
                    size: 'small',
                    stock: 16,
                }
            ],
            '3'
        ),
    ];

    // this function renders the content from the object product to the index page, dynamicaly.
    this.render = function () {
        var productsGridEl = document.getElementById('productsGrid');

        this.list.forEach(function (product) {
            var productEl = document.createElement('div');
            productEl.className = 'product-container';

            var productImageEl = document.createElement('div');
            productImageEl.className = 'product-image';
            productImageEl.innerHTML = '<img src="' + product.img + '">';

            var productNameEl = document.createElement('h2');
            productNameEl.className = 'product-name';
            productNameEl.innerHTML = product.name;

            // This variable selects the first item in the properties array as default.
            var selectedProp = product.properties[0];

            // TODO: change the currency dynamicly
            var productPriceEl = document.createElement('h6');
            productPriceEl.className = 'product-price';
            productPriceEl.innerHTML = `${selectedProp.price.eur}€`;

            // This is the quantity selector
            var productSelectQuantityEl = document.createElement('select');
            productSelectQuantityEl.id = `${product.id}-quantity-select`;
            for (var i = 0; i < selectedProp.stock; i++) {
                var option = document.createElement('option');
                option.value = i + 1;
                option.text = i + 1;
                productSelectQuantityEl.appendChild(option);
            }

            // This is the size selector
            var productSelectSizeEl = document.createElement('select');
            productSelectSizeEl.id = `${product.id}-size-select`;
            // Every time the size changes, the price is updated automatically.
            productSelectSizeEl.onchange = function () {
                // Getting the property selected by its index.
                selectedProp = product.properties[productSelectSizeEl.value];
                productPriceEl.innerHTML = `${selectedProp.price.eur}€`;
                // Set the new stock available
                // The selectedStock maps the array to return the quantity in number format if the size
                // is the same as the selected one, otherwise returns null. Then it filters out the null values.
                var selectedStock = cart.getSelectedProductsById(product.id).map(function (product) {
                    if (product.properties.size === productSelectSizeEl.value) {
                        return parseInt(product.properties.quantity, 10);
                    }
                    return null;
                }).filter(function (quantity) {
                    return quantity;
                });
                var availableStock = selectedProp.stock;
                if (selectedStock.length) {
                    // By the addition of all the quantities, it gets the selected stock.
                    // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
                    selectedStock.reduce(function (a, b) {
                        return a + b;
                    }, 0);
                    availableStock = selectedProp.stock - selectedStock;
                }
                // If the available stock is bigger than 0, the add to cart button and quantity select are enabled.
                productAddToCartEl.disabled = availableStock === 0;
                productSelectQuantityEl.disabled = availableStock === 0;

                productSelectQuantityEl.options.length = 0;
                for (var i = 0; i < availableStock; i++) {
                    var option = document.createElement('option');
                    option.value = i + 1;
                    option.text = i + 1;
                    productSelectQuantityEl.appendChild(option);
                }
            };
            for (var i = 0; i < product.properties.length; i++) {
                var option = document.createElement('option');
                // Saving the index in the value to get the prop selected on the onchange event.
                option.value = i;
                option.text = product.properties[i].size;
                productSelectSizeEl.appendChild(option);
            }

            // Save product to cart
            var cart = new Cart();
            var productAddToCartEl = document.createElement('button');
            productAddToCartEl.className = 'product-add-cart-button';
            productAddToCartEl.innerHTML = 'Add to cart';
            productAddToCartEl.onclick = function () {
                cart.addProduct(product, {
                    size: productSelectSizeEl.value,
                    quantity: productSelectQuantityEl.value,
                });
                // Set the new stock available
                // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
                var selectedStock = cart.getSelectedProductsById(product.id).map(function (product) {
                    if (product.selectedProperties.size === productSelectSizeEl.value) {
                        return parseInt(product.selectedProperties.quantity, 10);
                    }
                    return null;
                }).filter(function (quantity) {
                    return quantity;
                }).reduce(function (a, b) {
                    return a + b;
                }, 0);
                var availableStock = selectedProp.stock - selectedStock;
                if (availableStock === 0) {
                    productAddToCartEl.disabled = true;
                    productSelectQuantityEl.disabled = true;
                }
                productSelectQuantityEl.options.length = 0;
                for (var i = 0; i < availableStock; i++) {
                    var option = document.createElement('option');
                    option.value = i + 1;
                    option.text = i + 1;
                    productSelectQuantityEl.appendChild(option);
                }
            };

            productEl.appendChild(productImageEl);
            productEl.appendChild(productNameEl);
            productEl.appendChild(productPriceEl);
            productEl.appendChild(productSelectSizeEl);
            productEl.appendChild(productSelectQuantityEl);
            productEl.appendChild(productAddToCartEl);
            productsGridEl.appendChild(productEl);

            // Init the available stock
            // The selectedStock maps the array to return the quantity in number format if the size
            // is the same as the selected one, otherwise returns null. Then it filters out the null values.
            // https://www.w3schools.com/jsref/jsref_map.asp
            var selectedStock = cart.getSelectedProductsById(product.id).map(function (product) {
                if (product.selectedProperties.size === productSelectSizeEl.value) {
                    return parseInt(product.selectedProperties.quantity, 10);
                }
                return null;
            }).filter(function (quantity) {
                return quantity;
            });
            var availableStock = selectedProp.stock;
            if (selectedStock.length) {
                // By the addition of all the quantities, it gets the selected stock.
                // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
                selectedStock.reduce(function (a, b) {
                    return a + b;
                }, 0);
                availableStock = selectedProp.stock - selectedStock;
            }
            // If the available stock is bigger than 0, the add to cart button and quantity select are enabled.
            productAddToCartEl.disabled = availableStock === 0;
            productSelectQuantityEl.disabled = availableStock === 0;

            productSelectQuantityEl.options.length = 0;
            for (var i = 0; i < availableStock; i++) {
                var option = document.createElement('option');
                option.value = i + 1;
                option.text = i + 1;
                productSelectQuantityEl.appendChild(option);
            }
        });
    };
}
