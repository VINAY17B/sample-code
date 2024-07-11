const express = require("express");
const router = express.Router();
const multer = require("multer");
const { requireLogin } = require("../controllers/auth");
const {
  uploadcv,
  getCv,
  getCvStatus,
  applyJob,
  checkapplication,
  getApliedJobs,
  getApllicants,
} = require("../controllers/employee");
const { empRegister, read } = require("../controllers/employer");

const fileconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/employee/resumes");
  },
  filename: (req, file, callback) => {
    callback(null, `file-${Date.now()}.${file.originalname}`);
    console.log(file);
  },
});

const upload = multer({
  storage: fileconfig,
});

router.post(
  "/employee/cv-upload",
  requireLogin,
  upload.single("file"),
  uploadcv
);

router.get("/employee/get-cv/:id", requireLogin, getCv);
router.get("/employee/get-applied-jobs/:id", requireLogin, getApliedJobs);

router.get("/employee/cv-status/:id", requireLogin, getCvStatus);
router.get(
  "/employee/application-status/:id/:email",
  requireLogin,
  checkapplication
);
router.post("/employee/apply-for-job", requireLogin, applyJob);
module.exports = router;
