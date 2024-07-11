const express = require("express");
const { requireLogin } = require("../controllers/auth");
const {
  companyCreate,
  getUsername,
  getCompanyData,
  getCompnayJobs,
  getCatJobs,
  getTypeJobs,
} = require("../controllers/company");
const router = express.Router();
const multer = require("multer");

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/company");
  },
  filename: (req, file, callback) => {
    callback(null, `company-${Date.now()}.${file.originalname}`);
    console.log(file);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowd"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

router.post(
  "/company/registration",
  requireLogin,
  upload.single("picture"),
  companyCreate
);
router.get("/company/get-username/:id", getUsername);

router.get("/company/get-company-data/:id", getCompanyData);
router.get("/company/get-jobs/:id", getCompnayJobs);
router.get("/company/get-cat-jobs/:id/:com", getCatJobs);
router.get("/company/get-type-jobs/:id/:com", getTypeJobs);
module.exports = router;
