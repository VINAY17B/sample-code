const express = require("express");
const {
  categoryCreate,
  getCategory,
  typeCreate,
  getType,
  getUsers,
  userStatus,
  userDelete,
  userCreate,
  userDetail,
  userUpdate,
  getPerks,
  perksCreate,
  getSkills,
  skillCreate,
  skillsStatus,
  skillsDelete,
  perksStatus,
  perksDelete,
} = require("../controllers/admin");
const { adminCheck, requireLogin } = require("../controllers/auth");
const router = express.Router();

// category
router.get("/admin/get-category", requireLogin, adminCheck, getCategory);
router.post("/admin/add-category", requireLogin, adminCheck, categoryCreate);

// type
router.get("/admin/get-type", requireLogin, adminCheck, getType);
router.post("/admin/add-type", requireLogin, adminCheck, typeCreate);

// users
router.post("/admin/user-add", requireLogin, adminCheck, userCreate);
router.get("/admin/get-users", requireLogin, adminCheck, getUsers);
router.post("/admin/user-block/:id", requireLogin, adminCheck, userStatus);
router.post("/admin/user-delete/:id", requireLogin, adminCheck, userDelete);
router.get("/admin/user-detail/:id", requireLogin, adminCheck, userDetail);
router.post("/admin/user-update/:id", requireLogin, adminCheck, userUpdate);

// perks
router.get("/admin/get-perks", requireLogin, adminCheck, getPerks);
router.post("/admin/add-perks", requireLogin, adminCheck, perksCreate);
router.post("/admin/perks-block/:id", requireLogin, adminCheck, perksStatus);
router.post("/admin/perks-delete/:id", requireLogin, adminCheck, perksDelete);

// skills
router.get("/admin/get-skills", requireLogin, adminCheck, getSkills);
router.post("/admin/add-skills", requireLogin, adminCheck, skillCreate);
router.post("/admin/skills-block/:id", requireLogin, adminCheck, skillsStatus);
router.post("/admin/skills-delete/:id", requireLogin, adminCheck, skillsDelete);

module.exports = router;
