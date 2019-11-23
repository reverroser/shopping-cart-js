/**
 * @class Product
 * Description: This class creates a product item.
 * @param {String} name The product´s name
 * @param {String} details The product´s details
 * @param {String} img The product´s img
 * @param {Array} properties The product´s properties - [{ size, price, stock }]
 * @param {String} id The product´s id
 */
function Product(name, details, img, properties, id) {
    this.name = name;
    this.details = details;
    this.img = img;
    this.properties = properties;
    this.id = id;
}