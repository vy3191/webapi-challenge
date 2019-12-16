const express = require("express");
const router = express.Router({mergeParams:true});
const actions = require("../../data/helpers/actionModel");

router.get("/:actionId",getActionsById, async (req,res) => {
      res.json(req.action)
});

router.post("/", validateActions, async (req,res) => {
     try {
      const payload = {
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes
     }
      res.status(201).json(await actions.insert(payload));
     }catch(error) {
          res.status(500).json({msg:error})
     }

});

router.put("/:actionId", validateActions, getActionsById, async(req,res) => {
    try{
       const body = {
         description:req.body.description,
         notes:req.body.notes,
         project_id: req.params.id
       }
       await actions.update(req.params.actionId, body);
       const updatedAction = await actions.get(req.params.actionId);
       res.status(200).json(updatedAction);

    } catch(error) {
      res.status(500).json({msg:`Something went wrong--server error`});
    }
})

function getActionsById(req,res,next) {
    actions.get(req.params.actionId)
          .then( action => {
             console.log(action)
             if(!action.notes) res.status(404).json({msg:`There is no actions with ${req.params.actionId}`});
             req.action = action;
             next();
          })
          .catch(err => {
            res.status(500).json({msg:`Something went wrong--server error`});
          })
}

function validateActions(req,res,next) {
   const { description, notes} = req.body;
   if(!description) res.status(400).json({msg:`Description is missing`});
   if(!notes) res.status(400).json({msg:`Notes are missing in your action`});
   if(!notes && !description) res.status(400).json({msg:`Action is missing`});
   next();
}

module.exports = router;