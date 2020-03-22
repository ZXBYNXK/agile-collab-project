# /routes 
<!-- When making changes to this directory write about it in here. -->
1. Created articleRoutes.js 
    - Added GET & POST routes for the Articles Collection which refers to the <a href="https://github.com/DariusRain/agile-collab-project/blob/master/models/Article.js">models/Aritcle.js</a> model.
    ```javascript
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
            res.status(201).json(newArticles);
        } catch (err) {
            res.status(401).json({message: err.message});
        }
            
});
    ```
    
2. Created graduateRoutes.js
    - Added GET & POST routes for the Graduates collection which refers to the <a href="https://github.com/DariusRain/agile-collab-project/blob/master/models/Graduate.js">models/Graduate.js</a> model.
    ```javascript 
    router.get("/", async (req, res) => {
    try {
        const graduates = await Graduate.find();
        res.status(200).json(graduates);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
    });


    router.post("/", async (req, res) => {
        const graduate = new Graduate({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profession: req.body.profession,
            email: req.body.email
        });
        try {
            const newGraduate = await graduate.save();
            res.status(201).json(newGraduate);
        } catch (err) {
            res.status(400).json({

                message: err.message
            });
        }
    });
    ```