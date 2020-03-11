const express = require("express");
const router = express.Router();
const Graduate = require("../models/graduate");


router.get("/", async (req, res) => {
    try {
        const graduates = await Graduate.find();
        res.status(200).json(graduates);
    // #1 DR: Added a status code to be returned to the client/browser
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
    // #2 DR: Added profession field to the new schema @Joseph

    try {
        const newGraduate = await graduate.save();
        res.status(201).json(newGraduate);
    } catch (err) {
        res.status(400).json({

            message: err.message
        });
    }
});

//DR: For the most part everything is looking good, just communicate with team members 
// about the names they are using in the code as well as file names and directory names -> Refering to #2

module.exports = router;