const express = require("express");
const { requireLogin } = require("../controllers/auth");
const { getAllJobs } = require("../controllers/home");
const router = express.Router();

router.get("/home/get-jobs/", getAllJobs);
module.exports = router;
