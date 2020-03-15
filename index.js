const mongoose = require("mongoose");
const express = require("express");
const app = express();
require('dotenv/config')
const DB_CONNECTION = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 2000;
const enviroment =  process.env.NODE_ENV
const graduatesRoute = require('./routes/graduateRoutes');
const articleRoute = require('./routes/articleRoutes');

//enviroment.toLowerCase()

app.use(express.json());

app.use('/graduateRoutes', graduatesRoute)
app.use('/articleRoutes', articleRoute)

app.use(express.static("public"));


app.get('/', (req, res) => {
    res.status(200).render('index')
    
  })
  
  
  mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { 
      console.log(`Database: ${DB_CONNECTION}`)     
  })
    .catch(error => console.log("DB Connection error", error));
    
    app.use(express.static("public"));
  
  
  app.listen(PORT, () => { 
  console.log(`Server listening on port ${PORT}`)
  });


  

  