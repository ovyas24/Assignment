const express = require('express')
const Helper = require('../helper/helper')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/products');
    },  
    filename: function (req, file, callback) {
        console.log(file);
        callback(null, Date.now() + file.originalname);
    }
});

var upload = multer({ storage })

router.get('/products', async (req, res) => {
    try {
        const allProducts = await Helper.getAllProduct()
        res.json(allProducts)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/product/:id', async (req, res) => {
    try {
        const product = await Helper.getSingleProduct(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/products', upload.single('productimage'), async (req, res) => {
    try {
        console.log(req.body, req.file);
        if (req.file) {
            const isProductAdded = await Helper.addProduct(req.body, req.file.filename)
            res.json(isProductAdded)
        }
        else res.status(417).json('File Storage Error')
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.put('/product/:id', async (req, res) => {
    try {
        const isProductUpdated = await Helper.updateProduct(req.params.id, req.body, req.file)
        res.json(isProductUpdated)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.delete('/product/:id', async (req, res) => {
    try {
        const isProductDelted = await Helper.deleteProduct(req.params.id)
        res.json(isProductDelted)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router