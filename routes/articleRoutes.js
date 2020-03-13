const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

//  DR: After going through i see a lot of issues
// #1 res.article is not a route handler method: 
//      You should use res.json(javaScriptObject)
// #2 In the get one article route you need to find the article first  
//  in the route handler there shouldnt be any middleware added 
//  reffering to 'getArticleById' becuase there is no middleware by that name
//  defined in the code.   



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
// # 2 
// Your code before @sue
// router.get("/:id",getArticleById, (req,res)=> {
//     res.json(res.article)
// });

// Edited: 
// 1. Getting rid of 'getArtcleById
// 2. Adding 'async' before function declaration
// 3. Assign a variable named 'findArticle' that will have the value of
//      const findArticle = Article.findById(req.params.id) 
//      Syntax mongooseSchema.findById(idString)
//      And add res.json(findArticle)
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
        // req.params.id refers to ':id' all routes that have the colon next to it are in 'req.params.<nameOfParamater>'
        const findArticleById = await Article.findById(req.params.id)
        
        // 
       // await res.article.remove();
        const removeArticle = await findArticleById.remove()
        res.json({ message: "deleted article"});
    
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});




module.exports = router;
