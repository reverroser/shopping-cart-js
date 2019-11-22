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
            [1, 2, 3],
            [1, 2, 3],
            [
                {
                    size: "big"
                },
                {
                    size: "medium"
                },
                {
                    size: "small"
                }
            ],
            '1'
        ),
        new Product(
            'Gray rock',
            'lorem ipsum patatim',
            ['./assets/greyrock.jpg'],
            [1, 2, 3],
            [1, 2, 3],
            [
                {
                    size: "big"
                },
                {
                    size: "medium"
                },
                {
                    size: "small"
                }
            ],
            '2'
        ),
        new Product(
            'Black rock',
            'lorem ipsum patatim',
            ['./assets/darkrock.jpg'],
            [1, 2, 3],
            [1, 2, 3],
            [
                {
                    size: "big"
                },
                {
                    size: "medium"
                },
                {
                    size: "small"
                }
            ],
            '3'
        ),
    ];

    // this function renders the content from the object product to the index page, dynamicaly.
    this.render = function () {
        const productsGridEl = document.getElementById('productsGrid');

        this.list.forEach(function (product) {
            const productEl = document.createElement('div');
            productEl.className = 'product-container';

            const productImageEl = document.createElement('div');
            productImageEl.className = 'product-image';
            productImageEl.innerHTML = '<img src="' + product.img + '">';

            // This function stores the id of the product on localStorage, when the user clicks on the product-image.
            productImageEl.onclick = function () {
                localStorage.setItem('selected-product-id', product.id);
                window.location.replace('product.html');
            };

            const productNameEl = document.createElement('h2');
            productNameEl.className = 'product-name';
            productNameEl.innerHTML = product.name;

            const productPriceEl = document.createElement('h6');
            productPriceEl.className = 'product-price';
            productPriceEl.innerHTML = product.price;

            productEl.appendChild(productImageEl);
            productEl.appendChild(productNameEl);
            productEl.appendChild(productPriceEl);
            productsGridEl.appendChild(productEl);
        });
    };
}
