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




// Find Graduates by graduateName.      
router.get("/:graduateName", async (req, res) => {
    try {
    
        const graduateName = req.params.graduateName;
        const ifNameFound = await Graduate.find({graduateName: graduateName})
        
        // This checks if the above value is an empty array that means none found.
        // it dosent execute the catch block becuase there is no false value in an empty array.
        if(ifNameFound.length > 0) {
        res.status(200).json(ifNameFound);
        }
    } catch {
    

        res.status(404).json({ message: 'No Graduate Found.'})

    }

})

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
