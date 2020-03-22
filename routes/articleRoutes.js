const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// Predifined Object that renders 404 errors. 
const pug404 = {error: {message: '404 Not Found'}}
const pug500 = {error: {messgae: '500 Server Error'}}

//Getting all articles
router.get("/", async (req, res) => {
    try {
        const article = await Article.find();
        res.status(200).json(article);
        // #1 DR: Added status code to the response - Not major but prefreable 
    } catch (err) {
        res.status(500).render('errors', pug500);
    }
} )




router.get('/:id', async (req, res) => {
        try {
            const findArticle = await Article.findById(req.params.id)
             res.status(200).json(findArticle)
        } catch {
            res.status(404).render('errors', pug404)
        }
    })




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


router.delete("/:id", async (req,res)=> {
    try {
        const findArticleById = await Article.findById(req.params.id)
        
        // 
       // await res.article.remove();
        const removeArticle = await findArticleById.remove()
        res.json({ message: "deleted article"});
    
    } catch (err) {
        res.status(404).render('errors', pug404)
    }
});




module.exports = router;
