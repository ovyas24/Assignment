const Product = require("../model/product");

class Helper {
    constructor() { }

    async getAllProduct() {
        try {
            const products = await Product.find({})
            return products
        } catch (error) {
            return error
        }
    }

    async getSingleProduct(id) {
        try {
            const product = await Product.findOne({ _id: id })
            return product
        } catch (error) {
            return error
        }
    }

    async addProduct({ name, price, description }, image) {
        try {
            const newProduct = new Product({
                name, price, image, description
            })

            const isAdded = await newProduct.save()

            return isAdded ? `Product ${isAdded.name} is added to database with id : ${isAdded._id}` : `Product ${isAdded.name} is not added to database`
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, { name, price, description } = {}, image) {
        try {
            const product = await this.getSingleProduct(id)
            let updates = {}
            updates.name = name ? name : product.name
            updates.price = price ? price : product.price
            updates.image = image ? image : product.image
            updates.description = description ? description : product.description
            
            const isUpdated = await Product.updateOne({ _id: id }, updates)

            return isUpdated
        } catch (error) {
            return isUpdated
        }
    }

    async deleteProduct(id) {
        try {
            const isDeleted = await Product.deleteOne({ _id:id })
            return isDeleted
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

module.exports = new Helper