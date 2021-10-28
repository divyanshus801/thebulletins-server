const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    link: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    }
},{timestamps: true});

const news = mongoose.model('news', newsSchema);

module.exports = news;