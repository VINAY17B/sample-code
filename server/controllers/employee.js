const CV = require("../models/resume");
const Applications = require("../models/jobapplied");
const fs = require("fs");

exports.uploadcv = async (req, res) => {
  const { email, path } = req.body;
  try {
    let user = await CV.findOne({ where: { email: email } });
    if (!user) {
      if (req.file) {
        console.log("usernotfound");
        let newCV = await CV.create({ email: email, cv: req.file.filename });
        res.json({
          message: "CV Uploaded",
        });
      }
    } else {
      console.log(user);
      if (req.file) {
        user.cv = req.file.filename;
        if (path != "") {
          try {
            fs.unlinkSync(path);
          } catch (err) {
            console.error(err);
          }
        }
        await user.save();
        res.json({
          message: "CV Uploaded",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.getCv = async (req, res) => {
  const userId = req.params.id;
  try {
    const cv = await CV.findOne({ where: { email: userId } });
    if (!cv) {
      return res.status(400).json({
        error: "Email Dosen't Exist",
      });
    }
    res.json(cv.cv);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.getCvStatus = async (req, res) => {
  const userId = req.params.id;
  try {
    const cv = await CV.findOne({ where: { email: userId } });
    if (!cv) {
      return res.status(200).json({
        status: false,
      });
    }
    return res.status(200).json({
      status: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

exports.checkapplication = async (req, res) => {
  const job_id = req.params.id;
  const employee_email = req.params.email;
  console.log(job_id);

  try {
    const application = await Applications.findAll({
      where: { app_job_id: job_id, employee_email: employee_email }
    });
    console.log(application.length);
    if (application.length === 0) {
      return res.status(200).json({
        status: false,
      });
    } else {
      return res.status(200).json({
        status: true,
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

exports.applyJob = async (req, res) => {
  const { job_id, app_job_title, employee_email, employer_email } = req.body;
  console.log("JOBID : ", job_id);
  try {
    let newApp = await Applications.create({
      app_job_id: job_id,
      app_job_title: app_job_title,
      employee_email: employee_email,
      employer_email: employer_email,
    });
    return res.status(200).json({
      message: "Type Added",
      type: newApp,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: err,
    });
  }
};

exports.getApliedJobs = async (req, res) => {
  const userId = req.params.id;
  try {
    const applications = await Applications.findAll({
      where: { employee_email: userId }
    });
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
