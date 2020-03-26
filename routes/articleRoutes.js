const express = require("express");
const router = express.Router();
const Article = require("../models/Article");


//Getting all articles
router.get("/", async (req, res) => {
    try {
        const article = await Article.find();
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
} )



//Getting one article
router.get('/:id', async (req, res) => {
        try {
            const findArticle = await Article.findById(req.params.id)
             res.status(200).json(findArticle)
        } catch {
            res.status(404).json({message: "404 Not Found"})
        }
    })


//Update article

// Same goes here 
//  But we will come back to this later.
// router.put("/:id", getArticleById, async (req, res) => {
//     if (req.body.graduateName != null) {
//       res.article.graduateName = req.body.graduateName;
//     }
//     if (req.body.profession != null) {
//       res.article.profession = req.body.profession;
//     }
//     if (req.body.message != null) {
//       res.graduate.message= req.body.message;
//     }
//     try {
//       const updatedArticle = await res.article.save();
//       res.json(updatedArticle);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });



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
// #2 Same here 
// getArticleById shopuldnt be there
router.delete("/:id", async (req,res)=> {
    try {
        const findArticleById = await Article.findById(req.params.id)

        const removeArticle = await findArticleById.remove()
        res.json({ message: "deleted article"});
    
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});




module.exports = router;
