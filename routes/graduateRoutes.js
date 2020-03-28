const express = require("express");
const router = express.Router();
const Graduate = require("../models/Graduate");

// Predifined Object that renders 404 errors. 
const pug404 = {error: {message: '404 Not Found'}}
const pug500 = {error: {messgae: '500 Server Error'}}


// Find and retrieve all graduate data. 
router.get("/all", async (req, res) => {
  
    try {

        const graduates = await Graduate.find();
        res.status(200).json(graduates);


    } catch (err) {
        
        // Render 500 server error, becuase the above should work without any
        // requirements from the client.
        res.status(500).render('errors', pug500);
    
    }

});



// Find Graduates by first name.        //  <- DR: This route needs a try or catch block.
router.get("/search/:searchQueryName", async (req, res) => {
    try {
    
        const searchQuery = req.params.searchQueryName;
    
        const grads = await Graduate.find();

        const filterNames = grads.filter(object => {
            let fullName = `${object.firstName} ${object.lastName}`
            if(fullName.includes(searchQuery)){
                return object
            }
            console.log(1, req.params.firstName)
        })

        if(filterNames.length > 0) {
            res.status(200).json(filterNames);
        } else {
            res.status(404).json({message: 'No one found by that name.'})
        }
    } catch {
    
        // This line renders the errors.pug file with a 404 message. 
        res.status(500).json(message, 'Server Error')
    
    }
    
});


router.get('/public-profile/:id', async (req, res) => {
    try {
        const graduate = await Graduate.findById(req.params.id)
        res.status(200).render('public-profile', graduate)
    } catch {
        res.status(404).render('errors', pug404)
    }
})



// Creates new graduates and saves them to the database.
router.post("/post", async (req, res) => {

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
router.put('/update/:id', async (req, res) => {
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
    return res.status(404).render('errors', pug404);
    }
});



// Update a graduate using the ObjectId from the database.  
router.delete("/delete/:id", async (req, res) => {
    try {
const deletedGraduate = await Graduate.findByIdAndRemove(req.params.id);
    
    return res.status(200).json(deletedGraduate);
} catch {
     return res.status(404).render('errors', pug404);
}
})


module.exports = router;
