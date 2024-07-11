import React, { Fragment, useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Layouts from "../../components/Layouts";
import Image from "react-bootstrap/Image";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookie, isAuth, logout } from "../../core/helpers";
import axios from "axios";
import Card from "react-bootstrap/Card";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";
import * as BsIcons from "react-icons/bs";
import * as GrIcons from "react-icons/gr";
import Moment from "moment";
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import { convert } from "html-to-text";
import htmlToFormattedText from "html-to-formatted-text";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import {
//   EmailShareButton,
//   FacebookShareButton,
//   LinkedinShareButton,
//   RedditShareButton,
//   TelegramShareButton,
//   TwitterShareButton,
// } from "react-share";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ViewJob() {
  const navigate = useNavigate();
  const token = getCookie("token");
  const params = useParams();
  console.log("ID PASSED : " , params.id)
  const [data, setData] = useState("");
  const [cvstatus, setCvStatus] = useState(false);
  const [appliedstatus, setAppliedStatus] = useState(false);
  const [company, setCompany] = useState("");
  function dateFormat(date) {
    return Moment().format("MMM Do YY");
  }
  function dateFormat2(date) {
    return Moment().format("MMM YY");
  }
  const getJobData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/jobs/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setData(response.data.job);
        setCompany(response.data.company);
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
  const [similarjobs, setsimilarjobs] = useState("");
  const getSImilarJobs = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/similar-jobs/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setsimilarjobs(response.data);
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
  const realJobData = () => {
    return (
      <Fragment>
        <div className="white-background p-4 my-5">
          <div className="d-flex allign-items-ceter">
            <div>
              <Image
                src={`${process.env.REACT_APP_UPLOADS_URL}/company/${company.photo}`}
                className="img-md"
              ></Image>
            </div>

            <div className="ms-3 my-auto w-100">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h3>{data.job_title}</h3>
                  <h6>Company : {company.company}</h6>
                </div>
                <div className="">
                  <FacebookShareButton
                    url={window.location.href}
                    description={data.job_title}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <TwitterShareButton
                    className="ms-2"
                    url={window.location.href}
                    description={data.job_title}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    className="ms-2"
                    url={window.location.href}
                    description={data.job_title}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div
              dangerouslySetInnerHTML={{ __html: data.job_description }}
            ></div>
          </div>
        </div>
      </Fragment>
    );
  };
  const text = () => {
    convert(data.job_description, {
      wordwrap: 130,
    });
  };
  const jsPdfGenerate = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });
    doc.setFont(undefined, "bold");
    doc.text(data.job_title, 20, 20).setFontSize(12);

    doc.setFont(undefined, "normal");
    doc
      .text(
        `Company : ${company.company} | Location : ${
          data.job_location ? data.job_location : "remote"
        } | Salary :  ${data.job_CTC_min} to ${data.job_CTC_max} ${
          data.job_CTC_breakup
        } | Job Type : ${data.job_type}`,
        20,
        35
      )
      .setFontSize(12);

    var splitTitle = doc.splitTextToSize(
      htmlToFormattedText(data.job_description),
      380
    );

    doc.text(20, 50, splitTitle).setFontSize(8);

    doc.save(`${data.job_title}.pdf`);
    // const el = document.getElementById("content");
    // if (typeof el === "object" && el !== null) {
    //   const width = 170;
    //   const elementHandlers = {
    //     "#ignorePDF": (element, renderer) => {
    //       return true;
    //     },
    //   };
    //   doc.html(el, {
    //     x: 15,
    //     y: 15,
    //     width: 170,
    //     elementHandlers,
    //   });
    // }
    // doc.save(`${data.job_title}-${params.id}.pdf`);
  };

  const getCvStatus = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employee/cv-status/${isAuth().email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setCvStatus(response.data.status);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          logout(() => {
            navigate("/");
          });
        }
      });
  };
  const getApplicaionStatus = () => {
    console.log(data.id);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employee/application-status/${
        params.id
      }/${isAuth().email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAppliedStatus(response.data.status);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          logout(() => {
            navigate("/");
          });
        }
      });
  };

  const applyJob = () => {
    if (cvstatus == true) {
      if (appliedstatus == false) {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_URL}/employee/apply-for-job`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            job_id: data.id,
            app_job_title: data.job_title,
            employee_email: isAuth().email,
            employer_email: data.job_author,
          },
        })
          .then((response) => {
            toast.success("Applied Sucessfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
            getApplicaionStatus();
          })
          .catch((err) => {
            console.log(err.response.data);

            alert(err.response.data.error);
          });
      } else {
        toast.warning("You Have Already Applied", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.warning("Please Upload Your CV ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    getJobData();
    getSImilarJobs();
    getCvStatus();
    getApplicaionStatus();
  }, []);

  return (
    <Layouts>
      <Container>
        {data ? (
          <Row>
            <Col md={9}>
              <Fragment>
                <div className="white-background p-4 my-5">
                  <div className="d-flex allign-items-ceter">
                    <div>
                      <Image
                        src={`${process.env.REACT_APP_UPLOADS_URL}/company/${company.photo}`}
                        className="img-md"
                      ></Image>
                    </div>

                    <div className="ms-3 my-auto w-100">
                      <div className="d-flex justify-content-between">
                        <div className="">
                          <h3>{data.job_title}</h3>
                          <h6>Company : {company.company}</h6>
                        </div>
                        <div className="">
                          <FacebookShareButton
                            url={window.location.href}
                            description={data.job_title}
                          >
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>

                          <TwitterShareButton
                            className="ms-2"
                            url={window.location.href}
                            description={data.job_title}
                          >
                            <TwitterIcon size={32} round />
                          </TwitterShareButton>
                          <LinkedinShareButton
                            className="ms-2"
                            url={window.location.href}
                            description={data.job_title}
                          >
                            <LinkedinIcon size={32} round />
                          </LinkedinShareButton>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div
                      id="content"
                      dangerouslySetInnerHTML={{ __html: data.job_description }}
                    ></div>
                  </div>
                </div>
              </Fragment>
            </Col>
            <Col md={3}>
              <div className="white-background p-4 my-5">
                <h5 className="text-center">Job Overview</h5>
                <div className="d-flex allign-items-ceter my-4">
                  <div className="icon-back">
                    <AiIcons.AiOutlineUser />
                  </div>

                  <div className="ms-3">
                    <p className="m-0">Job Title : </p>
                    <p className="m-0">{data.job_title}</p>
                  </div>
                </div>
                <div className="d-flex allign-items-ceter my-4">
                  <div className="icon-back">
                    <BsIcons.BsCalendarDate />
                  </div>

                  <div className="ms-3">
                    <p className="m-0">Date Posted : </p>
                    <p className="m-0">{dateFormat(data.createdAt)}</p>
                  </div>
                </div>
                {data.job_location !== "" ? (
                  <div className="d-flex allign-items-ceter my-4">
                    <div className="icon-back">
                      <FiIcons.FiMapPin />
                    </div>
                    <div className="ms-3">
                      <p className="m-0">Location : </p>
                      <p className="m-0">{data.job_location}</p>
                    </div>
                  </div>
                ) : null}
                <div className="d-flex allign-items-ceter my-4">
                  <div className="icon-back">
                    <BsIcons.BsCurrencyDollar />
                  </div>
                  <div className="ms-3">
                    <p className="m-0">Salary : </p>
                    <p className="m-0">
                      {data.job_CTC_min} to {data.job_CTC_max}{" "}
                      {data.job_CTC_breakup}
                    </p>
                  </div>
                </div>
                <div className="d-flex allign-items-ceter my-4">
                  <div className="icon-back">
                    <BsIcons.BsBuilding />
                  </div>
                  <div className="ms-3">
                    <p className="m-0">Job Type : </p>
                    <p className="m-0">{data.job_type}</p>
                  </div>
                </div>
                <div className="d-flex ">
                  {isAuth() && isAuth().role == "Employee" ? (
                    <Button variant="primary" onClick={applyJob}>
                      Apply Now
                    </Button>
                  ) : null}

                  <Button
                    variant="primary"
                    className="ms-3"
                    onClick={jsPdfGenerate}
                  >
                    Download
                  </Button>
                </div>
              </div>
              <div className="white-background p-4 my-5">
                <h5 className="text-center">Similar Jobs</h5>
                {similarjobs ? (
                  similarjobs.map((job) => {
                    if (job.id !== data.id && job.job_status !== 0) {
                      return (
                        <Link
                          target="_blank"
                          to={`/job/${job.id}`}
                          key={job.id}
                        >
                          <div
                            className="d-flex allign-items-ceter my-4 py-2 border"
                            key={job.id}
                          >
                            <div className="ms-3">
                              <p className="m-0">{job.job_title}</p>
                              <p className="m-0">
                                {job.job_CTC_min} to {job.job_CTC_max}{" "}
                                {job.job_CTC_breakup}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    } else {
                      return null;
                    }
                  })
                ) : (
                  <p>none</p>
                )}
              </div>
              <div className="white-background p-4 my-5">
                <div className="m-auto d-flex justify-content-center">
                  <div>
                    <Image
                      src={`${process.env.REACT_APP_UPLOADS_URL}/company/${company.photo}`}
                      className="img-sm "
                    ></Image>
                    <div className="text-center">
                      <h6 className="m-auto">{company.company}</h6>
                      <p className="m-0 text-muted">
                        Since {dateFormat2(data.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex allign-items-ceter my-4">
                  <div className="icon-back">
                    <BsIcons.BsTelephone />
                  </div>

                  <div className="ms-3">
                    <p className="m-0">Phone: </p>
                    <p className="m-0">{company.phone}</p>
                  </div>
                </div>
                <div className="d-flex allign-items-ceter my-4">
                  <div className="icon-back">
                    <AiIcons.AiOutlineMail />
                  </div>

                  <div className="ms-3">
                    <p className="m-0">Email : </p>

                    <p className="m-0">{company.email}</p>
                  </div>
                </div>
                <div className="d-flex allign-items-ceter my-4">
                  <div className="icon-back">
                    <BsIcons.BsLinkedin />
                  </div>

                  <div className="ms-3">
                    <p className="m-0">Linkedin : </p>
                    <a href={`${company.linkedin}`} target="_blank">
                      <p className="m-0">{company.linkedin}</p>
                    </a>
                  </div>
                </div>
                <div className="d-flex allign-items-ceter my-4">
                  <div className="icon-back">
                    <BsIcons.BsFacebook />
                  </div>

                  <div className="ms-3">
                    <p className="m-0">Facebook : </p>
                    <a href={`${company.facebook}`} target="_blank">
                      <p className="m-0">{company.facebook}</p>
                    </a>
                  </div>
                </div>
                <div className="d-flex allign-items-ceter my-4">
                  <div className="icon-back">
                    <BsIcons.BsTwitter />
                  </div>

                  <div className="ms-3">
                    <p className="m-0">Twitter : </p>
                    <a href={`${company.twitter}`} target="_blank">
                      <p className="m-0">{company.twitter}</p>
                    </a>
                  </div>
                </div>

                <Button variant="primary">View Profile</Button>
              </div>
            </Col>
          </Row>
        ) : null}
      </Container>
      <ToastContainer className="theToast" />
    </Layouts>
  );
}
