const User = require("../models/user");
const Emp = require("../models/employer");
const Otp = require("../models/otp");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { expressjwt: exjwt } = require("express-jwt");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = async (req, res) => {
  console.log("Registered", req.body);
  const { name, email, password, role } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    // Encrypt password
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .createHmac("sha1", salt)
      .update(password)
      .digest("hex");

    // Create new user
    const newUser = await User.create({
      name: name,
      email: email,
      h_password: hashedPassword,
      salt: salt,
      role: role || "user", // Default role to "user" if not provided
    });

    res.json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(400).json({
      error: "Failed to register user",
    });
  }
};

exports.signin = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ where: { email: email } });

    // Check if user exists
    if (!user) {
      console.log("Doesnt exist user")
      return res.status(400).json({
        error: "Email doesn't exist",
      });
    }

    // Authenticate user
    if (!user.authenticate(password)) {
      console.log("incorrect password")
      return res.status(400).json({
        error: "Incorrect password",
      });
    }

    // Check if user is blocked
    if (user.block_user) {
      return res.status(400).json({
        error: "Not authorized",
      });
    }

    // Generate token
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    {// Destructure user object for response
    const { id, name, email, role, isVerified } = user;

    // Send response with token and user details
    return res.status(200).json({
      msg: "Welcome",
      token: token,
      user: { id, name, email, role, isVerified },
    });}
  } catch (err) {
    console.error("Error signing in:", err);
    return res.status(400).json({
      error: "Signin failed",
    });
  }
};

// middleware

exports.requireLogin = exjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.requireauth = exjwt({
  secret: process.env.JWT_RESET_PASSWORD,
  algorithms: ["HS256"],
});

exports.adminCheck = async (req, res, next) => {
  const userId = req.auth._id; // Assuming req.auth contains authenticated user information

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // If user does not exist
    if (!user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }

    // Check if user role is admin
    if (user.role !== "admin") {
      return res.status(400).json({
        error: "Admin Not Found",
      });
    }

    // Attach user profile to request object
    req.profile = user;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error checking admin:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// forgot pasword
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    // If user does not exist
    if (!user) {
      return res.status(400).json({
        error: "Email does not exist",
      });
    }

    // Generate OTP
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    // Create new OTP entry
    const newOtp = await Otp.create({
      userId: user.id,
      otpcode: otp,
      expiresIn: new Date().getTime() + 600 * 1000, // 10 minutes expiry
    });

    // Email data for OTP
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset OTP`,
      html: `
        <h3>OTP: ${otp}</h3>
        <hr />
        <p>This OTP expires in 10 minutes</p>
      `,
    };

    // Send email with OTP
    sgMail.send(emailData)
      .then((sent) => {
        return res.json({
          message: `OTP has been sent to ${email}.`,
          user: user.id,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });

  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const userId = req.params.id;
  const { otp } = req.body;

  try {
    // Find OTP by userId and otpcode
    const otpEntry = await Otp.findOne({ where: { userId, otpcode: otp } });

    // If OTP not found
    if (!otpEntry) {
      return res.status(400).json({
        error: "Invalid OTP. Please try again.",
      });
    }

    // Generate JWT token for password reset
    const token = jwt.sign(
      { userId: otpEntry.userId },
      process.env.JWT_RESET_PASSWORD,
      { expiresIn: "10m" }
    );

    return res.status(200).json({
      message: "OTP verified",
      token: token,
      user: otpEntry.userId,
    });

  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// reset pasword
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    // If user not found
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // Update user's password
    user.password = password;
    await user.save();

    return res.json({
      message: "Password reset successful. You can now log in with your new password.",
    });

  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

