const express = require('express');

const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cart = require('./Cart');

app.use(bodyParser.json());

mongoose.connect('mongodb://tejaswini:tejaswini123@ds237357.mlab.com:37357/tejaswini-expressapp',{ useNewUrlParser: true },() => {
  console.log('Database connected');
});

app.get('/', async (req,res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch(err) {
        res.json({message: err});
    }
});

app.post('/', async (req,res) => {
    const cart = new Cart ({
        title: req.body.title,
	    quantity: req.body.quantity,
    	imageUrl: req.body.imageUrl,
	    variant: req.body.variant,
    	brand: req.body.brand,
	    category: req.body.category,
    	price: req.body.price,
	    userId: req.body.userId
    });
    try {
        const savedCart = await cart.save();
        res.json(savedCart);
    } catch (err) {
        res.json({message: err});
    }
});

app.patch('/:cartId', async (req,res) => {
    try {
        const updatedCart = await Cart.updateOne(
            {_id: req.params.cartId},
            { $set: {title: req.body.title,
                    quantity: req.body.quantity,
                    imageUrl: req.body.imageUrl,
                    variant: req.body.variant,
                    brand: req.body.brand,
                    category: req.body.category,
                    price: req.body.price,
                    userId: req.body.userId  
                }
            }
        );
        res.json(updatedCart);
    } catch(err) {
        res.json({message: err});
    }
});

app.delete('/:cartId', async (req,res) => {
    try {
        const removedCart = await Cart.remove({_id: req.params.cartId});
        res.json(removedCart);
    } catch(err) {
        res.json({ message: err });
    }
});

app.listen(3001);