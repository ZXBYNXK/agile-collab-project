const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

//Getting all articles
router.get("/", async (req, res) => {
    try {
        const article = await Article.find();
        res.json(article);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
} )

//Create new article
router.post("/", async (req, res) => {
    const{graduateName, profession, message}=req.body; 
    const article = new Article({
        graduateName,
        profession,
        message
    });

    try {
        const newArticle = await article.save();
        res.status(201).json(newGraduates);
    } catch (err) {
        res.status(401).json({message: err.message});
    }
        
});

module.exports = router;