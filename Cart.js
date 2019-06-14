const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    title: {
        type: String
    },
    quantity: {
        type: Number
    },
    imageUrl: {
        type: String
    },
    variant: {
        type: String
    },
    brand: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    userId: {
        type: String
    }
});

module.exports = mongoose.model('carts',cartSchema);
