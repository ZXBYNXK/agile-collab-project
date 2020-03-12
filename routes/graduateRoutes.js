const express = require("express");
const router = express.Router();
const Graduate = require("../models/graduate");


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


router.put('/:id', async (req, res) => {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, {
        userName: req.body.userName,
        profession: req.body.profession,
        email: req.body.email,
        message: req.body.message
    }, {
        new: true
    });



    if (!updatedMessage) return res.status(404).send(`No message found with that ID`);

    res.json(updatedMessage);

});




router.delete("/:id", async (req, res) => {
    const message = await Message.findByIdAndRemove(req.params.id);
    if (!message) return res.status(404).send(`No message found`);
    res.json(message);
})


module.exports = router;