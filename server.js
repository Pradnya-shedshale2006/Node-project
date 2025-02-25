const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

const Blog = require('./API/mongodbconnect.js')

dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/Welcome.html'));
});


// Route to serve the Add Blog page
app.get('/add-blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'Add-blog.html'));
});


// Route to handle the form submission
app.post('/add-blog', (req, res) => {
    const { title, content, image_url, tags } = req.body
    console.log('DAta from froent: ', req.body)



    // Create a new blog post in the database
    const newBlog = new Blog({
        title,
        content,
        image_url, 
        tags: tags.split(',').map(tag => tag.trim())
    });
    // Save the new blog post
    newBlog.save()
        .then(()=>{
            console.log('Blog post added successfully!')
            res.redirect('/')

        } )
        .catch((err) =>{
            
            console.log('Error saving blog post: ' + err)
            res.status(500).send('Error saving blog post: ' + err)
        });


});


app.get('/reading-blog', function(request, response){

    Blog.find()
    .then(function(result){
        console.log('Got blog data successfully in reading blog')

        response.render('read-blog.ejs', {data: result})

    })
    .catch(function(){
        console.log('Got error while reading blog data')
        response.send('Got error while reading blog data')
    })
})
// Start the server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
