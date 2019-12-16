const express = require("express");
const router = express.Router({mergeParams:true});
const actions = require("../../data/helpers/actionModel");

router.get("/:actionId",getActionsById, async (req,res) => {
      res.json(req.action)
});



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

module.exports = router;