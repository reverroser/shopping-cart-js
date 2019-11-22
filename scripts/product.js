// This returns a product getting the id from localStorage and filtering the products list.
function getSelectedProduct() {
    var products = new Products();
    var id = localStorage.getItem('selected-product-id');
    return products.list.find(function (product) {
        return product.id === id;
    });
}

var product = getSelectedProduct();

product.render();
