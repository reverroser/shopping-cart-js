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
                productSelectQuantityEl.options.length = 0;
                for (var i = 0; i < selectedProp.stock; i++) {
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
                cart.addProduct(product);
                // Set the new stock available
                // TODO: get the available stock from localStorage
                var availableStock = selectedProp.stock - productSelectQuantityEl.value;
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
        });
    };
}
