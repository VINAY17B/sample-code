const express = require("express");
const {
  signup,
  signin,
  forgotPassword,
  verifyOtp,
  requireLogin,
  resetPassword,
  requireauth,
} = require("../controllers/auth");
const { runvalidation } = require("../validator");
const {
  userValidator,
  userloginValidator,
  forgotpasswordValidator,
} = require("../validator/auth");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    msg: "all good",
  });
});

router.post("/signup", userValidator, runvalidation, signup);
router.post("/signin", userloginValidator, signin);
// router.post("/google-login", googleLogin);
// router.post("/facebook-login", facebookLogin);
router.post(
  "/forgot-password",
  forgotpasswordValidator,
  runvalidation,
  forgotPassword
);
router.post("/otp-verification/:id", verifyOtp);
router.post("/reset-password", requireauth, resetPassword);
module.exports = router;
