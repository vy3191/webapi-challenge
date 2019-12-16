const express = require("express");
const router = express.Router();
const projects = require("../../data/helpers/projectModel");

router.get("/", async (req,res) => {
    try {
      const pjs = await projects.get();
      res.status(200).json(pjs);
    } catch(error) {
       res.status(500).json({msg:error})
    }
});

router.post("/", validateProject, async(req,res) => {
     try {
      const playload = {
        name: req.body.name,
        description:req.body.description
     }
       res.status(200).json( await projects.insert(playload));

     }catch(error) {
        
     }

});


function validateProject(req,res,next) {
    const { name, description } = req.body;
    if(!name) res.status(400).json({msg:`Name is missing`});
    if(!description) res.status(400).json({msg:`Description is missing`});
    if(!name && !description) res.status(400).json({msg:`project details are missing`});
    next();
}

module.exports = router;