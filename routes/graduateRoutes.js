const express = require("express");
const router = express.Router();
const Graduate = require("../models/Graduate");

// Predifined Object that renders 404 errors. 
const pug404 = {error: {message: '404 Not Found'}}
const pug500 = {error: {messgae: '500 Server Error'}}


// Find and retrieve all graduate data. 
router.get("/", async (req, res) => {
  
    try {

        const graduates = await Graduate.find();
        res.status(200).json(graduates);


    } catch (err) {
        
        // Render 500 server error, becuase the above should work without any
        // requirements from the client.
        res.status(500).render('errors', pug500);
    
    }

});



// Find Graduates by graduateName.        //  <- DR: This route needs a try or catch block.
router.get("/:graduateName", async (req, res) => {
    try {
    
        const graduateName = req.params.graduateName;
    
        // const errors = {};       //  <- DR: Dont know what this is for. Will keep it comment if somebody needed it.
        // const nameError = await Graduate.find({ graduateName: graduateName });         //  <- DR: Changed the variable name to 'ifNameFound' 
        const ifNameFound = await Graduate.find({graduateName: graduateName})
        
        // This checks if the above value is an empty array that means none found.
        // it dosent execute the catch block becuase there is no false value in an empty array.
        if(ifNameFound.length > 0) {
        res.status(200).json(ifNameFound);
        } else {
            res.status(404).render('errors', pug404)
        }
    } catch {
    
        // This line renders the errors.pug file with a 404 message. 
        res.status(404).render('errors', pug404)
    
    }
    
});


// Creates new graduates and saves them to the database.
router.post("/", async (req, res) => {

    const graduate = new Graduate({
        graduateName: req.body.graduateName,
        profession: req.body.profession,
        company: req.body.company,
        graduationDate: req.body.graduationDate,
        skills: req.body.skills,
        linkedIn: req.body.linkedIn,
        twitter: req.body.twitter,
        email: req.body.email
   })


    try {

        const newGraduate = await graduate.save();
        res.status(201).json(newGraduate);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
});



// Update a graduate using the MongoDB ObjectId as a parameter in the URI.  
router.put('/:id', async (req, res) => {
    try {
const updatedGraduate = await Graduate.findByIdAndUpdate(req.params.id, {
    graduateName: req.body.graduateName,
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
    return res.status(404).render('errors', pug404);
    }
});



// Update a graduate using the ObjectId from the database.  
router.delete("/:id", async (req, res) => {
    try {
const deletedGraduate = await Graduate.findByIdAndRemove(req.params.id);
    
    return res.status(200).json(deletedGraduate);
} catch {
     return res.status(404).render('errors', pug404);
}
})

// DR: Commenting this route out dont know what this route is for, could have possibly have been me.

// async function getGraduate(req, res, next) {
//     let graduate
//     try {
//         graduate = await Graduate.findById(req.params.id)
//         if (graduate == null)
//         return res.status(404).json({ message: 'Cannot find profile' })
//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }

//     res.graduate = graduate;
//     next()
// }


module.exports = router;
