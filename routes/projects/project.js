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
})


module.exports = router;