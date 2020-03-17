const express = require("express");
const router = express.Router();
const Graduate = require("../models/Graduate");

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
    console.log(28, req.body)
    const graduate = new Graduate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profession: req.body.profession,
        company: req.body.company,
        graduationDate: req.body.graduationDate,
        skills: req.body.skills,
        linkedIn: req.body.linkedIn,
        twitter: req.body.twitter,
        email: req.body.email
   })

    // 
    console.log(29, graduate)

    try {
        const newGraduate = await graduate.save();
        res.status(201).json(newGraduate);
    } catch (err) {
        res.status(400).json({

            message: err.message
        });
    }
});

// DR: (3/14/20)
//  Added missing feilds from my update to the Graduate Schema based on the form on the front-end.
router.put('/:id', async (req, res) => {
    try {
const updatedGraduate = await Graduate.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profession: req.body.profession,
    company: req.body.company,
    graduationDate: req.body.graduationDate,
    skills: req.body.skills,
    linkedIn: req.body.linkedIn,
    twitter: req.body.twitter,
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
