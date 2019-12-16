const express = require("express");
const router = express.Router();
const actions = require("../../data/helpers/actionModel");

router.get("/:id", async (req,res) => {
    try {
      const actions = await posts.get(req.params.id);
      res.status(200).json(posts);
    } catch(error) {
       res.status(500).json({msg:error})
    }
})


module.exports = router;