import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, useParams } from "react-router-dom";
import Cardlist from "../../components/Cardlist";
import Layouts from "../../components/Layouts";
import Image from "react-bootstrap/Image";
import Moment from "moment";
import Jobcard from "../../components/Jobcard";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { getCookie, logout } from "../../core/helpers";

export default function Company() {
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(false);
  const token = getCookie("token");
  const [data, setData] = useState("");
  const [jobs, setJobs] = useState("");
  const [jobcount, setJobcount] = useState("");
  const getCompanyData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/company/get-company-data/${params.id}`,
    })
      .then((response) => {
        setData(response.data.company);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const getUsername = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/company/get-username/${params.id}`,
    })
      .then((response) => {
        setPage(response.data.res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const getallJobs = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/company/get-jobs/${params.id}`,
    })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const getallcatJobs = (text) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/company/get-cat-jobs/${text}/${params.id}`,
    })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const getalltypeJobs = (text) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/company/get-type-jobs/${text}/${params.id}`,
    })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  function dateFormat2(date) {
    return Moment().format("MMM YY");
  }
  const [cat, setCat] = useState("");
  const getCategories = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-categories`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setCat(response.data);
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        if (err.response.status === 401) {
          logout(() => {
            navigate("/");
          });
        }
      });
  };

  const [typedata, settypedata] = useState("");
  const skill = [];
  const getTypes = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-types`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        settypedata(response.data);
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        if (err.response.status === 401) {
          logout(() => {
            navigate("/");
          });
        }
      });
  };

  const [perkdata, setperkdata] = useState("");
  const perk = [];
  const getPerks = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-perks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setperkdata(response.data);
        response.data.map((data) => {
          perk.push({
            label: data.perks_name,
            value: data.id,
          });
        });
        // console.log(perk);
        setperkdata(perk);
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        if (err.response.status === 401) {
          logout(() => {
            navigate("/");
          });
        }
      });
  };

  const [selectedcat, setSelectedCat] = useState("");
  const handleSelect = (text) => (e) => {
    if (text === "category") {
      getallcatJobs(e.target.value);
    }
    if (text === "type") {
      getalltypeJobs(e.target.value);
    }
  };
  useEffect(() => {
    getUsername();
    getCompanyData();
    getallJobs();
    getCategories();
    getTypes();
  }, []);

  return (
    <Layouts>
      {page ? (
        <Fragment>
          <Container className="">
            <div className="my-5 d-flex">
              <Image
                src={`${process.env.REACT_APP_UPLOADS_URL}/company/${data.photo}`}
                className="img-md me-3"
              ></Image>
              <div>
                <h3>{data.company}</h3>
                <p className="text-muted">
                  Since {dateFormat2(data.createdAt)}
                </p>
              </div>
            </div>
          </Container>
          <div className="white-background py-5">
            <Container>
              <h6>About: </h6>
              <br />

              <p
                className="mb-5"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></p>
              <Row>
                <Col md={4} sm={12}>
                  {typedata ? (
                    <Fragment>
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleSelect("type")}
                      >
                        <option>Select Options</option>
                        {typedata.map((c) => (
                          <option value={c.type_name} key={c.id}>
                            {c.type_name}
                          </option>
                        ))}
                      </Form.Select>
                    </Fragment>
                  ) : null}
                </Col>
                <Col md={4} sm={12}>
                  {cat ? (
                    <Fragment>
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleSelect("category")}
                      >
                        <option>Select Options</option>
                        {cat.map((c) => (
                          <option value={c.cat_name} key={c.id}>
                            {c.cat_name}
                          </option>
                        ))}
                      </Form.Select>
                    </Fragment>
                  ) : null}
                </Col>
              </Row>

              <h6>{jobs.length} Jobs Found: </h6>
              <Row className="">
                {jobs
                  ? jobs.map((job) => {
                      if (job.job_status === 1) {
                        return (
                          <Col md={6} lg={3} sm={12} key={job.id}>
                            <Jobcard
                              pagelink={`/job/${job.id}`}
                              title={job.job_title}
                              date={dateFormat2(job.createdAt)}
                              location={
                                job.job_location === ""
                                  ? "remote"
                                  : job.job_location
                              }
                              type={job.job_type}
                              category={job.job_category}
                              salay={`${job.job_CTC_min} to ${job.job_CTC_max} ${job.job_CTC_breakup}`}
                              image={`${process.env.REACT_APP_UPLOADS_URL}/company/${data.photo}`}
                              compnay={data.company}
                            />
                          </Col>
                        );
                      }
                    })
                  : null}
              </Row>
            </Container>
          </div>
        </Fragment>
      ) : (
        <div className="d-flex justify-content-center allign-items-center py-5">
          <div className="my-5">
            <h1>404</h1>
            <p className="m-0">Page Not Found</p>
          </div>
        </div>
      )}
    </Layouts>
  );
}
