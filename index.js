const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//To convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended:"true"}));
//Using static files
app.use(express.static(path.join(__dirname,'public')));
app.set( "view engine" , "ejs" );


//To read tasks at "/route" from file folder using fs module 
app.get('/', function(req,res){
    //Reading directory
    fs.readdir(`./files`, function(err,files){
     res.render("index", {files: files});
    });
});

//When our form will be submitted, it will come to this route==>/create
app.post('/create', function(req,res){
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.detailsoftasks, function(err){
    //redirecting to /route
    res.redirect("/");
   });
});


//Create a route for displaying data of Read More.
app.get('/file/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,filedata){
        res.render('show', {filename:req.params.filename, filedata:filedata});
    });     
});

//For displaying the data of edit.
app.get('/edit/:filename', function(req,res){
    //Now we willl render edit page.
    res.render('edit',{filename:req.params.filename});
});

//Route for updating name
app.post('/edit', function(req,res){
    //At backend , we will get previous anme as previous and new name as new
    // `./files/${req.body.previous}`==> This is our path
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err){
        res.redirect("/");
    });
});


//To run the PORT
app.listen(4500, function(req,res){
    console.log("Server is running on port 4500");
});
