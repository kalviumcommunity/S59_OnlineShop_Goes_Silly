const Joi = require('joi')
const express = require('express')
const router = express.Router();
const { connectToMongoDB } = require('./db.js')
const product = require('./Schemas/schema.js')
const userProduct = require('./Schemas/addProductsSchema.js')

const userSchema = Joi.object({
    productId : Joi.number().integer(),
    productName : Joi.string().required(),
    category: Joi.string().required(),
    catID : Joi.number().integer(),
    prodSrc : Joi.string().required(),
})

const checkValidation = (input) => {
    const {error} = userSchema.validate(input)
    if(error){
        return false
    }
    else{
        return true
    }
}

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

router.post('/new-item', async (req, res) => {
    if(!checkValidation(req.body)){
        return res.status(400).json({"Error" : "Data validation failed. Please add data as per the norms"})
    }
    const newProduct = new userProduct({
        productName: req.body.productName,
        category: req.body.category,
        prodSrc: req.body.prodSrc
    })
    try {
        const savedProd = await newProduct.save()
        res.json(savedProd)
    }
    catch (err) {
        res.json({ error: "An Error occurred" })
    }
})

router.get('/user-items/:name', async (req, res) => {
    try {
        const foundProduct = await userProduct.findOne({ productName: req.params.name });

        if (foundProduct) {
            res.json(foundProduct);
        } else {
            res.json({ error: "Product not found" });
        }
    } catch (err) {
        res.json({ error: "An error occurred" });
    }
});

router.put('/user-items-update/:name', async (req, res) => {
    try {
        const foundProduct = await userProduct.findOneAndUpdate(
            { productName: req.params.name },
            req.body,
            { new: true }
        );

        if (!foundProduct) {
            return res.status(404).json({ error: "Product Not Found" });
        }

        res.json(foundProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error: ' + err });
    }
});


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
router.delete('/delete-user-items/:id', async (req, res) => {
    try {
        const foundProduct = await userProduct.findByIdAndDelete(req.params.id);
        if (!foundProduct) {
            return res.status(404).json({ error: "Product Not Found" })
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

connectToMongoDB()

module.exports = router