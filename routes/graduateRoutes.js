const express = require("express");
const router = express.Router();
const Graduate = require("../models/Graduate");
// DR: Capitalized graduate file name in the require above

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
       })
    // 

    try {
        const newGraduate = await graduate.save();
        res.status(201).json(newGraduate);
    } catch (err) {
        res.status(400).json({

            message: err.message
        });
    }
});

// DR: You forgot to add try and catch to this and 
// The handlers below and you shouldn't be using the Article model at
// All.
router.put('/:id', async (req, res) => {
    try {
const updatedArticle = await Graduate.findByIdAndUpdate(req.params.id, {
        userName: req.body.userName,
        profession: req.body.profession,
        email: req.body.email
    }, {
        new: true
    });

res.status(200).json(updatedGraduate)
} catch {

    return res.status(404).send(`No message found with that ID`);

    }

});




router.delete("/:id", async (req, res) => {
    try {
const deletedGraduate = await Graduate.findByIdAndRemove(req.params.id);
    
    return res.status(200).json(deletedGraduate);
} catch {
     return res.status(404).send(`No graduate found`);
}
})


module.exports = router;
