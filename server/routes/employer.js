const express = require("express");
const router = express.Router();
const multer = require("multer");

const { requireLogin } = require("../controllers/auth");
const {
  empRegister,
  read,
  getSkills,
  getSkillselect,
  getTypes,
  getUsers,
  getPerksselect,
  getCategories,
  getCompany,
  jobCreate,
  getAllJobs,
  jobDelete,
  jobStatus,
  jobDetail,
  getSimilarJobs,
  getApllicants,
  getApllicantdata,
  statusInterview,
  statusHire,
  statusReject,
  getApllicantsCV,
} = require("../controllers/employer");

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/employer");
  },
  filename: (req, file, callback) => {
    callback(null, `Logo-${Date.now()}.${file.originalname}`);
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
  "/employer-registration",
  requireLogin,
  upload.single("picture"),
  empRegister
);
/* 
*/
router.post("/employer/add-job", requireLogin, jobCreate);

router.get("/employers/:id", requireLogin, read);
router.get("/employer/get-skills", getSkills);

router.get("/employer/get-skills", getSkillselect);
router.get("/employer/get-perks", getPerksselect);
router.get("/employer/get-types", getTypes);
router.get("/employer/get-categories", getCategories);
router.get("/employer/get-company/:id", getCompany);
router.get("/employer/get-users/:id", getUsers);
router.get("/employers/get-allJobs/:id", getAllJobs);

router.get("/employer/get-applicants/:id", requireLogin, getApllicants);

router.get("/employer/get-applicant-cv/:id", requireLogin, getApllicantsCV);
router.get(
  "/employer/get-job-application-data/:id",
  requireLogin,
  getApllicantdata
);
router.post("/employer/status-interview/:id", requireLogin, statusInterview);
router.post("/employer/status-hire/:id", requireLogin, statusHire);
router.post("/employer/status-reject/:id", requireLogin, statusReject);

router.post("/employers/delete-job/:id", jobDelete);
router.post("/employers/publish-job/:id", jobStatus);
router.get("/employer/jobs/:id", jobDetail);
router.get("/employer/similar-jobs/:id", getSimilarJobs);

module.exports = router;
