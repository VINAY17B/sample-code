const Job = require("../models/job");
const Company = require("../models/company");

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({ where: { job_status: 1 } });
    const companies = await Company.findAll();

    return res.status(200).json({
      jobs,
      companies,
    });
  } catch (err) {
    console.error("Error fetching jobs and companies:", err);
    return res.status(400).json({
      error: "Failed to fetch jobs and companies",
    });
  }
};
