const mongoose = require("mongoose");
const express = require("express");
const app = express();
const DB_CONNECTION = process.env.DB_CONNECTION;
const PORT = process.env.PORT;
const enviroment =  process.env.NODE_ENV
const graduateRoute = require('./routes/graduateRoutes');
const articleRoute = require('./routes/articleRoutes');
const defaultRedirect = require('./routes/middleware/defaultRedirect')
const path = require('path')
enviroment.toLowerCase()
app.use(express.json());
app.set('view engine', 'pug')



app.use('/graduateRoutes', graduateRoute)
app.use('/articleRoutes', articleRoute)

// Added Joseph's About page
app.use('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/about.html'))
})



  // Mongoose Database Connection.
  mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => { 
      console.log(`Database: ${DB_CONNECTION}`)     
  })
    .catch(error => console.log("DB Connection error", error));


  
  //DR: This uses the public folder/directory as a path to hold files that are used on the front-end. 
    app.use(express.static("public"));
  
  
  //DR: This redirects back to home if no route handlers find a solution. 
    app.use(defaultRedirect)
    
  // Set server to liste on Port
  app.listen(PORT, () => { 
  console.log(`Server listening on port ${PORT}`)
  });


  