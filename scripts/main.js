// This function stores the id of the product on localStorage, when the user clicks on the product-image.

// console.log(shopProducts.id);
// storeProductId();

// this function renders the content from the object product to the index page, dynamicaly.
function renderProducts() {
    const productsGridEl = document.getElementById('product-grid');
    shopProducts.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product-container';

        const productImageEl = document.createElement('div');
        productImageEl.className = 'product-image';
        productImageEl.innerHTML = '<img src="' + product.img + '">'
        function storeProductId() {
            localStorage.setItem('id', product.id)
        };
        // on click, storeProductId()
        productImageEl.onclick = storeProductId;


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
}

renderProducts();
