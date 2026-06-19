const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/auth");



const jobController = require("../controllers/jobController");

// GET ALL JOBS
router.get("/", jobController.getAllJobs);

// SEARCH JOBS
router.get("/search", jobController.searchJobs);

// GET SINGLE JOB
router.get("/:id", jobController.getJobById);

// ADD JOB
router.post("/add", jobController.addJob);

// UPDATE JOB (IMPORTANT FIX)
router.put("/:id", jobController.updateJob);

// DELETE JOB
router.delete("/:id", jobController.deleteJob);



router.put("/update/:id", jobController.updateJob);
router.delete("/delete/:id", jobController.deleteJob);

router.post("/add", verifyAdmin, jobController.addJob);
router.put("/update/:id", verifyAdmin, jobController.updateJob);
router.delete("/delete/:id", verifyAdmin, jobController.deleteJob);

module.exports = router;