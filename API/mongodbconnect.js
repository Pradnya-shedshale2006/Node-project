const mongoose = require('mongoose')
const { error } = require('server/router')

mongoose.connect('mongodb://localhost:27017/BLOGS')
    .then(() => {
        console.log('mongoDb database is connected successfully')
    })
    .catch((error) => {
        console.log('error while connecting with mongoDb database:', error)
    })



const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true,
    },


    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    tags: [{
        type: String,
        required: false
    }],
    image_url: "String"

});



const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
