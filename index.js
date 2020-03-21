const mongoose = require("mongoose");
const express = require("express");
const app = express();
const DB_CONNECTION = process.env.DB_CONNECTION;
const PORT = process.env.PORT;
const enviroment =  process.env.NODE_ENV
const graduatesRoute = require('./routes/graduateRoutes');
const articleRoute = require('./routes/articleRoutes');

enviroment.toLowerCase()
app.use(express.json());
app.set('view engine', 'pug')



app.use('/graduateRoutes', graduatesRoute)
app.use('/articleRoutes', articleRoute)




  mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => { 
      console.log(`Database: ${DB_CONNECTION}`)     
  })
    .catch(error => console.log("DB Connection error", error));


  
  
    app.use(express.static("public"));
  
  
  //DR: This redirects back to home if no route handlers find a solution. 
    app.use( (req, res, next) => {
      res.redirect('/')
    })
    


  app.listen(PORT, () => { 
  console.log(`Server listening on port ${PORT}`)
  });


  