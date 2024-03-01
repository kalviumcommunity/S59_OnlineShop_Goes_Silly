const express = require('express')
const router = express.Router();
const { connectToMongoDB } = require('./db.js')
const product = require('./schema.js')

router.get('/', async (req, res) => {
    try {
        const products = await product.find()
        res.json(products)
    }
    catch (err) {
        res.json({ error: "An Error occurred" })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const foundProduct = await product.findById(req.params.id)
        res.json(foundProduct)

    }
    catch (err) {
        res.json({ error: "An Error occurred" })

    }

});

router.post('/add-items', async (req, res) => {
    const newProduct = new product({
        productID: req.body.productID,
        productName: req.body.productName,
        category: req.body.category,
        catId: req.body.catID,
    })
    try {
        const savedProd = await newProduct.save()
        res.json(savedProd)
    }
    catch (err) {
        res.json({ error: "An Error occurred" })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const foundProduct = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!foundProduct) {
            return res.status(404).json({ error: "Product Not Found" })
        }
        res.json(foundProduct)

    }
    catch (err) {
        res.status(500).send('Error: ' + err);

    }

});

router.put('/:id', async (req, res) => {
    try {
        const foundProduct = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!foundProduct) {
            return res.status(404).json({ error: "Product Not Found" })
        }
        res.json(foundProduct);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const foundProduct = await product.findByIdAndDelete(req.params.id);
        if (!foundProduct) {
            return res.status(404).json({ error: "Product Not Found" })
        }
        res.send('Product deleted');
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

connectToMongoDB()

module.exports = router