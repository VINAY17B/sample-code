const Emp = require("../models/employer");
const User = require("../models/user");
const Skills = require("../models/skill");
const Type = require("../models/type");
const Perks = require("../models/perks");
const Category = require("../models/categories");
const Company = require("../models/company");
const Job = require("../models/job");
const Applications = require("../models/jobapplied");
const CV = require("../models/resume");
const { expressjwt: exjwt } = require("express-jwt");
exports.empRegister = async (req, res) => {
  console.log("Registered", req.body);
  const {
    employer_name,
    employer_company_name,
    employer_domain,
    employer_mobile,
    employer_email,
    employer_location,
    employer_recruiter,
  } = req.body;

  try {
    // Check if user already exists by email
    const existingUser = await Emp.findOne({ where: { employer_email: employer_email } });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    // Create new employer
    let newEmp = await Emp.create({
      employer_name,
      employer_company_name,
      employer_domain,
      employer_mobile,
      employer_email,
      employer_location,
      employer_recruiter,
    });

    // If there's a file uploaded, handle saving the filename to the database
    if (req.file) {
      console.log(req.file);
      newEmp.employer_logo = req.file.filename;
      await newEmp.save(); // Save the updated Emp instance
    }

    // Update user verification status
    const user = await User.findOne({ where: { email: employer_email } });
    if (user) {
      user.isVerified = true;
      user.name = employer_name;
      await user.save(); // Save the updated User instance
    }

    res.json({
      message: "User Registered",
    });
  } catch (error) {
    console.error("Error registering employer:", error);
    return res.status(400).json({
      error: "Failed to register employer",
    });
  }
};

exports.read = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find employer by employer_email
    const employer = await Emp.findOne({ where: { employer_email: userId } });

    if (!employer) {
      return res.status(400).json({
        error: "Employer Not Found",
      });
    }

    res.json(employer);
  } catch (error) {
    console.error("Error fetching employer:", error);
    return res.status(500).json({
      error: "Failed to fetch employer",
    });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skills.findAll();
    return res.status(200).json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err);
    return res.status(400).json({
      error: "Failed to fetch skills",
    });
  }
};


exports.getSkillselect = async (req, res) => {
  try {
    const skills = await Skills.findAll();
    return res.status(200).json(skills);
  } catch (err) {
    console.error("Error fetching skills for select:", err);
    return res.status(400).json({
      error: "Failed to fetch skills for select",
    });
  }
};

exports.getPerksselect = async (req, res) => {
  try {
    const perks = await Perks.findAll();
    return res.status(200).json(perks);
  } catch (err) {
    console.error("Error fetching perks:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({
      where: {
        email: userId,
        role: "Employer"
      }
    });
    if (user) {
      return res.status(200).json({
        message: ""
      });
    }
    return res.status(200).json({
      message: "doesn't exist"
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(400).json({
      error: "Some Error"
    });
  }
};


exports.getTypes = async (req, res) => {
  try {
    const types = await Type.findAll();
    return res.status(200).json(types);
  } catch (err) {
    console.error("Error fetching types:", err);
    return res.status(400).json({
      error: "Some Error"
    });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    return res.status(400).json({
      error: "Some Error"
    });
  }
};

exports.getCompany = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Emp.findOne({ where: { employer_email: userId } });
    if (!user) {
      return res.status(400).json({
        error: "Some Error",
      });
    }

    const com = await Company.findOne({ where: { username: user.employer_company_name } });
    if (com) {
      return res.status(200).json({
        company: user.employer_company_name,
        message: "",
      });
    } else {
      return res.status(200).json({
        message: `${user.employer_company_name} Company doesn't Exist`,
        company: user.employer_company_name,
      });
    }
  } catch (err) {
    console.error("Error fetching company:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};

exports.jobCreate = async (req, res) => {
  const {
    job_author,
    job_title,
    job_description,
    job_category,
    job_type,
    job_CTC_min,
    job_CTC_max,
    job_CTC_breakup,
    job_salary_details,
    job_fixed_pay,
    job_relocation,
    job_variable_pay,
    job_company_name,
    perks,
    skills,
    collaborators,
    job_email,
    job_location,
  } = req.body;

  const jobLocation = job_location === "" ? "remote" : job_location;

  try {
    const newJob = await Job.create({
      job_author,
      job_title,
      job_description,
      job_category,
      job_type,
      job_CTC_min,
      job_CTC_max,
      job_CTC_breakup,
      job_salary_details,
      job_fixed_pay,
      job_relocation,
      job_variable_pay,
      job_company_name,
      perks,
      skills,
      collaborators,
      job_email,
      job_location: jobLocation,
    });

    res.json(newJob);
  } catch (err) {
    console.error("Error creating job:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  const userId = req.params.id;

  try {
    const jobs = await Job.findAll({
      where: {
        job_author: userId,
      },
    });

    const companies = await Company.findAll();

    if (!jobs) {
      return res.status(404).json({
        error: "No jobs found for the user",
      });
    }

    res.status(200).json({
      jobs: jobs,
      companies: companies,
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(400).json({
      error: "Error fetching jobs",
    });
  }
};

exports.jobDelete = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    await job.destroy();

    res.status(200).json({
      msg: "Job Deleted Successfully",
    });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(400).json({
      error: "Error deleting job",
    });
  }
};


exports.jobStatus = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    // Toggle job status
    job.job_status = job.job_status === 0 ? 1 : 0;

    // Save updated job status
    await job.save();

    res.status(200).json(job);
  } catch (err) {
    console.error("Error updating job status:", err);
    res.status(400).json({
      error: "Job update failed",
    });
  }
};


exports.jobDetail = async (req, res) => {
  const jobId = req.params.id;

  try {
    // Find job by ID
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(400).json({
        error: "Job Not Found",
      });
    }

    // Find company associated with the job
    const company = await Company.findOne({
      where: { username: job.job_company_name }
    });

    if (!company) {
      return res.status(400).json({
        error: "Company Not Found",
      });
    }

    // Return company and job details
    return res.status(200).json({
      company: company,
      job: job,
    });
  } catch (err) {
    console.error("Error fetching job details:", err);
    return res.status(400).json({
      error: "Error fetching job details",
    });
  }
};


exports.getSimilarJobs = async (req, res) => {
  const jobId = req.params.id;

  try {
    // Find job by ID
    const job = await Job.findByPk(jobId);

    if (!job) {
      return res.status(400).json({
        error: "Job Not Found",
      });
    }

    // Find similar jobs based on job category
    const similarJobs = await Job.findAll({
      where: { job_category: job.job_category },
    });

    // Return similar jobs
    return res.status(200).json(similarJobs);
  } catch (err) {
    console.error("Error fetching similar jobs:", err);
    return res.status(400).json({
      error: "Error fetching similar jobs",
    });
  }
};


exports.getApllicants = async (req, res) => {
  
  try {
    const userId = req.params.id;
    // Find applications by employer email
    const applications = await Applications.findAll({
      where: { employer_email: userId },
    });
    
    // Return applications if found
    if (applications) {
      return res.status(200).json(applications);
    } else {
      return res.status(404).json({
        error: "No applications found",
      });
    }
  } catch (err) {
    console.error("Error fetching applications:", err);
    return res.status(400).json({
      error: "Error fetching applications",
    });
  }
};


exports.getApllicantsCV = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find CV by email
    const cv = await CV.findOne({ where: { email: userId } });

    // Return CV if found
    if (cv) {
      return res.status(200).json(cv.cv); // Assuming cv.cv contains the CV data
    } else {
      return res.status(404).json({
        error: "CV not found",
      });
    }
  } catch (err) {
    console.error("Error fetching CV:", err);
    return res.status(400).json({
      error: "Error fetching CV",
    });
  }
};

exports.getApllicantdata = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find application by id
    const application = await Applications.findOne({ where: { id: userId } });

    // Return application data if found
    if (application) {
      return res.status(200).json(application);
    } else {
      return res.status(404).json({
        error: "Application not found",
      });
    }
  } catch (err) {
    console.error("Error fetching application data:", err);
    return res.status(400).json({
      error: "Error fetching application data",
    });
  }
};

exports.statusInterview = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find application by id
    const application = await Applications.findOne({ where: { id: userId } });

    // Update application status if found
    if (application) {
      application.status = 1; // Assuming status 1 represents interview status
      await application.save(); // Save updated application

      return res.status(200).json(application);
    } else {
      return res.status(404).json({
        error: "Application not found",
      });
    }
  } catch (err) {
    console.error("Error updating application status:", err);
    return res.status(400).json({
      error: "Error updating application status",
    });
  }
};


exports.statusHire = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find application by id
    const application = await Applications.findOne({ where: { id: userId } });

    // Update application status if found
    if (application) {
      application.status = 2; // Assuming status 2 represents hired status
      await application.save(); // Save updated application

      return res.status(200).json(application);
    } else {
      return res.status(404).json({
        error: "Application not found",
      });
    }
  } catch (err) {
    console.error("Error updating application status:", err);
    return res.status(400).json({
      error: "Error updating application status",
    });
  }
};

exports.statusReject = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find application by id
    const application = await Applications.findOne({ where: { id: userId } });

    // Update application status if found
    if (application) {
      application.status = 3; // Assuming status 3 represents rejected status
      await application.save(); // Save updated application

      return res.status(200).json(application);
    } else {
      return res.status(404).json({
        error: "Application not found",
      });
    }
  } catch (err) {
    console.error("Error updating application status:", err);
    return res.status(400).json({
      error: "Error updating application status",
    });
  }
};
