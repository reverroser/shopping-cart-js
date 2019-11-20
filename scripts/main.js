function renderProducts() {
    const productsGridEl = document.getElementById('product-grid');
    shopProducts.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product-container';

        const productImageEl = document.createElement('div');
        productImageEl.className = 'product-image';
        productImageEl.innerHTML = '<img src="' + product.img + '">'

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
