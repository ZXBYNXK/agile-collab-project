const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

//Getting all articles
router.get("/", async (req, res) => {
    try {
        const article = await Article.find();
        res.status(200).json(article);
        // #1 DR: Added status code to the response - Not major but prefreable 
    } catch (err) {
        res.status(500).json({message: err.message});
    }
} )

//Getting one article
router.get("/:id",getArticle, (req,res)=> {
    res.json(res.article)
});



//Create new article
router.post("/", async (req, res) => {
    const{graduateName, profession, message}=req.body; 
    const article = new Article({
        graduateName: graduateName,
        profession: profession,
        message: message
    });

    try {
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(401).json({message: err.message});
    }
        
});
//Delete one article
router.delete()




module.exports = router;