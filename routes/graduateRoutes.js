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



router.get("/:firstName", async (req, res) => {
    const firstName = req.params.firstName;
    const errors = {};
    const nameError = await Graduate.find({ firstName: firstName });

    res.send(nameError);
});

// router.get("/:firstName", getGraduate, (req, res) => {
//     res.send(req.params.firstName)
// })

// router.get("/:firstName", async (req, res) => {
//     try {
//         const firstName = req.params.firstName;
//         res.json(firstName);
//     }catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });




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

async function getGraduate(req, res, next) {
    let graduate
    try {
        graduate = await Graduate.findById(req.params.id)
        if (graduate == null)
        return res.status(404).json({ message: 'Cannot find profile' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.graduate = graduate;
    next()
}


module.exports = router;
