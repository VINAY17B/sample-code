import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Jobcard from "./Jobcard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../core/helpers";

export default function Cardlist() {
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(false);
  const token = getCookie("token");
  const [data, setData] = useState("");
  const [jobs, setJobs] = useState("");
  const [company, setCompany] = useState("");
  const [jobcount, setJobcount] = useState("");
  const [companyimage, setCompanyimage] = useState("");
  const [companyname, setCompanyname] = useState("");

  const getallJobs = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/home/get-jobs`,
    })
      .then((response) => {
        console.log(response)
        setJobs(response.data.jobs);
        setCompany(response.data.companies);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  function dateFormat2(date) {
    return Moment().format("MMM YY");
  }
  useEffect(() => {
    getallJobs();
  }, []);
  return (
    <div className="list">
      <Container>
        <h6>{jobs.length} Jobs Found: </h6>
        <Row className="mt-3">
          {jobs
            ? jobs.map((job) => {
                company.map((data) => {
                  if (data.username === job.job_company_name) {
                    console.log(data.photo, job.job_title);
                  }
                });

                return (
                  <Col md={6} lg={3} sm={12} key={job.id}>
                    <Jobcard
                      pagelink={`/job/${job.id}`}
                      title={job.job_title}
                      date={dateFormat2(job.createdAt)}
                      location={
                        job.job_location === "" ? "remote" : job.job_location
                      }
                      type={job.job_type}
                      category={job.job_category}
                      salay={`${job.job_CTC_min} to ${job.job_CTC_max} ${job.job_CTC_breakup}`}
                    />
                  </Col>
                );
              })
            : null}
        </Row>
      </Container>
    </div>
  );
}
