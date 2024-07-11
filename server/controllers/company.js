const Company = require("../models/company");
const Job = require("../models/job");

exports.companyCreate = async (req, res) => {
  const {
    name,
    desc,
    email,
    username,
    facebook,
    twitter,
    linkedin,
    number,
    location,
  } = req.body;

  try {
    // Check if username already exists
    const existingUser = await Company.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    // Create new company
    let newUser = await Company.create({
      company: name,
      username: username,
      description: desc,
      phone: number,
      email: email,
      location: location,
      facebook: facebook,
      twitter: twitter,
      linkedin: linkedin,
    });

    // Handle photo upload if available
    if (req.file) {
      console.log(req.file);
      newUser.photo = req.file.filename;
      await newUser.save();
    }

    return res.json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.getUsername = async (req, res) => {
  const username = req.params.id;
  try {
    const user = await Company.findOne({ where: { username: username } });
    if (user) {
      return res.status(200).json({
        message: "Username already exists",
        username: username,
        res: true,
      });
    } else {
      return res.status(200).json({
        message: "",
        username: username,
        res: false,
      });
    }
  } catch (err) {
    console.error("Error checking username:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};


exports.getCompanyData = async (req, res) => {
  const username = req.params.id;
  try {
    const company = await Company.findOne({ where: { username: username } });
    if (company) {
      return res.status(200).json({
        company: company,
      });
    } else {
      return res.status(404).json({
        error: "Company not found",
      });
    }
  } catch (err) {
    console.error("Error fetching company data:", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.getCompnayJobs = async (req, res) => {
  const userId = req.params.id;
  try {
    const jobs = await Job.findAll({
      where: { job_company_name: userId, job_status: 1 }
    });
    return res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching company jobs:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};

exports.getCatJobs = async (req, res) => {
  const userId = req.params.id;
  const com = req.params.com;
  try {
    const jobs = await Job.findAll({
      where: {
        job_company_name: com,
        job_category: userId,
        job_status: 1,
      }
    });
    return res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching categorized jobs:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};


exports.getTypeJobs = async (req, res) => {
  const userId = req.params.id;
  const com = req.params.com;
  try {
    const jobs = await Job.findAll({
      where: {
        job_company_name: com,
        job_type: userId,
        job_status: 1,
      }
    });
    return res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching type-specific jobs:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};