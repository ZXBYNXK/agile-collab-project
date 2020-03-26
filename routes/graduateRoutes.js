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
        graduateName: req.body.graduateName,
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
