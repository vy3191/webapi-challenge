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

router.put("/:id",validateProject, validateById, async (req,res) => {
    try {
       const payload = {
         name: req.body.name,
         description: req.body.description
       }
       await projects.update(req.params.id, payload);
       const project = await projects.get(req.params.id);
       res.status(201).json(project)
    } catch(error) {
       res.status(500).json({msg:error});
    }
});


function validateById(req,res,next) {
    projects.get(req.params.id)
            .then( project => {
                if(project) {
                   req.project = project;
                   next();
                }
            })
            .catch(err => {
               res.status(500).json({msg:`Something went wrong`});
            })
}


function validateProject(req,res,next) {
    const { name, description } = req.body;
    if(!name) res.status(400).json({msg:`Name is missing`});
    if(!description) res.status(400).json({msg:`Description is missing`});
    if(!name && !description) res.status(400).json({msg:`project details are missing`});
    next();
}

module.exports = router;