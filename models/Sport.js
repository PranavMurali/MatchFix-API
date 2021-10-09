const mongoose = require('mongoose');

const SportSchema =mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sport', SportSchema);