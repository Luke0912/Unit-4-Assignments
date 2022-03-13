const express = require("express"); //we require it here



const userController = require("./controllers/user.controller");
const submissionController = require("./controllers/submission.controller");
const studentController = require("./controllers/student.controller");
const evaluationController = require("./controllers/evaluation.controller");
const batchController = require("./controllers/batch.controller");
const crudController = require("./controllers/crud.controllers")



const router = new express.Router(); //we require it here



router.use("/user",userController )
router.use("/submission",submissionController )
router.use("/submission",crudController)
router.use("/highest",crudController)
router.use("/student",studentController )
router.use("/evaluation",evaluationController )
router.use("/batch",batchController )

module.exports = router






