const express = require('express')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router();
const { connectToMongoDB } = require('./db.js')
require('dotenv').config()

const product = require('./Schemas/schema.js')
const userProduct = require('./Schemas/addProductsSchema.js')
const user = require('./Schemas/userSchema.js')

const SECRET = process.env.SECRET

const userSchema = Joi.object({
    productId: Joi.number().integer(),
    productName: Joi.string().required(),
    category: Joi.string().required(),
    catID: Joi.number().integer(),
    prodSrc: Joi.string().required(),
    userName: Joi.string().required()
})

const validateRegister = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string(),
    mail: Joi.string().required(),
    password: Joi.string().required(),
})

const checkValidation = (input, schemaName) => {
    const { error } = schemaName.validate(input)
    if (error) {
        return false
    }
    else {
        return true
    }
}

router.post('/register', async (req, res) => {
    const findUser = await user.findOne({ mail: req.body.mail })
    if (findUser) {
        return res.status(409).json({ Error: "User already exists" })
    }
    if (!checkValidation(req.body, validateRegister)) {
        return res.status(400).json({ "Error": "Data validation failed. Please add data as per the norms" })
    }
    const newUser = new user({
        fname: req.body.fname,
        lname: req.body.lname,
        mail: req.body.mail,
        password: req.body.password,
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json({ savedUser })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error adding the new user. Try again later" })
    }
})

router.post('/login', async (req, res) => {
    const findUser = await user.findOne({ mail: req.body.mail})
    if (findUser) {
        const isMatch = await bcrypt.compare(req.body.password, findUser.password)
        if (isMatch) {
            const token = jwt.sign({ userId: findUser._id }, SECRET, { expiresIn: '6h' })
            return res.json({ Message: "Login Successful!", Name: findUser.fname, accessToken: token })
        }
        else {
            res.status(401).json({ Error: "Wrong Credentials!" })
        }
    }
    else {
        return res.status(401).json({ Error: "Login Failed!" })
    }
})

router.post('/logout', async (req, res) => {
    return res.json({ Message: "Logout successfull!" })
})

router.get('/', async (req, res) => {
    try {
        const products = await product.find()
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch products" })
    }
})

router.get('/user-item/', async (req, res) => {
    try {
        const userproducts = await userProduct.find()
        res.json(userproducts)
    }
    catch (err) {
        res.status(500).json({ error: "Failed fetching the store" })
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await user.find();
        const usernames = users.map(user => user.fname)
        res.json(usernames);
    } catch (err) {
        res.status(500).json({ error: "No user found" });
    }
});



router.get('/:id', async (req, res) => {
    try {
        const foundProduct = await product.findById(req.params.id)
        res.json(foundProduct)

    }
    catch (err) {
        res.json({ error: "Product not found" })

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
    if (!checkValidation(req.body, userSchema)) {
        return res.status(400).json({ "Error": "Data validation failed. Please add data as per the norms" })
    }
    const newProduct = new userProduct({
        productName: req.body.productName,
        category: req.body.category,
        prodSrc: req.body.prodSrc,
        userName: req.body.userName
    })
    try {
        const savedProd = await newProduct.save()
        res.json(savedProd)
    }
    catch (err) {
        res.json({ error: "An Error occurred in adding" })
    }
})

router.get('/user-items/:name/:username', async (req, res) => {
    try {
        const foundProduct = await userProduct.findOne({ productName: req.params.name });

        if (foundProduct && foundProduct.userName == req.params.username) {
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