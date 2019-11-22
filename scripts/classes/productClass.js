/**
 * @class Product
 * Description: This class creates a product item and renders it.
 * @param {String} name The product´s name
 * @param {String} details The product´s details
 * @param {String} img The product´s img
 * @param {Array} price the product´s proce
 * @param {Array} stock The product´s stock amount
 * @param {Array} properties The product´s properties
 * @param {String} id The product´s id
 */
function Product(name, details, img, price, stock, properties, id) {
    this.name = name;
    this.details = details;
    this.img = img;
    this.price = price;
    this.stock = stock;
    this.properties = properties;
    this.id = id;

    this.render = function () {
        // render product
    }
}