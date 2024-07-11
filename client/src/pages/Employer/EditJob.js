import React, { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Layouts from "../../components/Layouts";
import Sidebar from "../../components/Sidebar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import axios from "axios";
import { getCookie, isAuth, logout } from "../../core/helpers";
import { useNavigate, useParams } from "react-router-dom";
import ReactTags from "react-tag-autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditJob() {
  const navigate = useNavigate();
  const token = getCookie("token");
  const params = useParams();
  const [values, setValues] = useState({
    title: "",
    location: "",

    pay: "",
    minSalary: "",
    address: "",
    maxSalary: "",
    ctcType: "",
    fixed: "",
    variable: "",
    requirements: "",
    type: "",
    category: "",
    skills: "",
  });
  const [boolval, setBoolval] = useState({
    relocation: false,
    perks: false,
    remote: false,
  });
  const {
    title,
    location,
    skills,
    address,
    type,
    fixed,
    variable,
    minSalary,
    locationType,
    ctcType,
    maxSalary,
    category,
    pay,
    requirements,
  } = values;
  const { perks, remote, relocation } = boolval;

  const [tags, setTags] = useState([]);
  const [tags2, setTags2] = useState();
  const [data, setData] = useState("");
  const getTypes = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-types`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setData(response.data);
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
  const [companyerror, setcompanyerror] = useState("");
  const [company, setcompany] = useState("");
  const getError = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-company/${
        isAuth().email
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log(response.data.company);
        setcompany(response.data.company);
        if (response.data.message !== "") {
          setcompanyerror(response.data.message);
        }
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

  const [skilldata, setskilldata] = useState("");
  const skill = [];
  const getSkills = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-skills`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setskilldata(response.data);
        response.data.map((data) => {
          skill.push({
            label: data.skill_name,
            value: data.id,
          });
        });
        // console.log(skill);
        setskilldata(skill);
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

  const [textinfo, settextinfo] = useState({
    title: "",
  });

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const handelchange = (text) => (e) => {
    // console.log(e.target.value);

    setValues({ ...values, [text]: e.target.value });
  };
  const handelcheck = () => {
    if (remote === true) {
      setBoolval({
        ...boolval,
        remote: false,
      });
    } else {
      setBoolval({
        ...boolval,
        remote: true,
      });
    }
  };
  const handelreloc = () => {
    if (remote === false) {
      if (relocation === true) {
        setBoolval({
          ...boolval,
          relocation: false,
        });
      } else {
        setBoolval({
          ...boolval,
          relocation: true,
        });
      }
    } else {
      setBoolval({
        ...boolval,
        relocation: false,
      });
    }
  };
  const handelperks = () => {
    if (perks === true) {
      setBoolval({
        ...boolval,
        perks: false,
      });
    } else {
      setBoolval({
        ...boolval,
        perks: true,
      });
    }
  };

  useEffect(() => {
    const formData = window.localStorage.getItem("temp-job-data");
    const theData = JSON.parse(formData);
    setValues(theData);
    setBoolval({
      ...boolval,
      remote: false,
      perks: false,
    });
  }, []);

  const handlelocChange = (e) => {
    setValues({ ...values, location: location });

    function initAutocomplete() {
      var input = document.getElementById("pac-input");
      var searchBox = new window.google.maps.places.SearchBox(input);
      searchBox.addListener("places_changed", function () {
        this.setState({
          CollegeName: document.getElementById("pac-input").value,
        });
      });
    }

    initAutocomplete();
  };

  const [selectedOptions, setSelectedOptions] = useState();

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  const [selectedOptions2, setSelectedOptions2] = useState();

  function handleSelect2(data) {
    setSelectedOptions2(data);
  }

  const handleDelete = (index) => {
    // console.log("S>>>: ", tags[index]);
    if (emailerror.includes(tags[index].name)) {
      setemailerror("");
    }
    const newTags = tags.slice(0);
    newTags.splice(index, 1);
    setTags(newTags);
  };
  const [emailerror, setemailerror] = useState();
  const handleAddition = (tag) => {
    // console.log(tag);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-users/${tag.name}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // console.log(response);
      if (response.data.message !== "") {
        setemailerror(tag.name + " " + response.data.message);
      }
      // console.log("response ", response.data.message);
    });
    const newTags = [].concat(tags, tag);
    const newTags2 = [].concat(tags2, tag.name);
    setTags(newTags);
    setTags2(newTags2);
    // console.log("hhhhhhh", tags2);
  };

  const getJobData = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/jobs/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
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
          job_varaible_pay,
          job_company_name,
          perks,
          skiklls,
          collabrators,
          job_email,
          job_location,
        } = response.data;
        setValues({
          ...values,
          title: job_title,
          location: job_location,
          pay: job_salary_details,
          minSalary: job_CTC_min,
          maxSalary: job_CTC_max,
          ctcType: job_CTC_breakup,
          fixed: job_fixed_pay,
          variable: job_varaible_pay,
          type: job_type,
          category: job_category,
        });
        setTags2(collabrators);
        setSelectedOptions(skiklls);
        setSelectedOptions2(perks);
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

  useEffect(() => {
    window.localStorage.setItem("temp-job-data", JSON.stringify(values));
    getTypes();
    getSkills();
    getPerks();
    getCategories();
    getError();
    getJobData();
    // setoptionList(data.map((data) => data.skill_name));
  }, []);

  const submitform = (e) => {
    e.preventDefault();
    console.log(textinfo.description.value);
    if (remote === true) {
      setValues({
        ...values,
        location: "remote",
      });
    }

    localStorage.removeItem("temp-job-data");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/employer/add-job`,
      data: {
        job_author: isAuth().email,
        job_title: title,
        job_description: textinfo.description.value,
        job_category: category,
        job_type: type,
        job_CTC_min: minSalary,
        job_CTC_max: maxSalary,
        job_CTC_breakup: ctcType,
        job_salary_details: pay,
        job_fixed_pay: fixed,
        job_varaible_pay: variable,
        job_company_name: company,
        perks: selectedOptions2,
        skiklls: selectedOptions,
        collabrators: tags2,
        job_email: isAuth().email,
        job_location: location,
        job_relocation: relocation,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        toast.success("Job Added Sucessfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setValues({
          ...values,
          title: "",
          location: "",

          pay: "",
          minSalary: "",
          address: "",
          maxSalary: "",
          ctcType: "",
          fixed: "",
          variable: "",
          requirements: "",
          type: "",
          category: "",
          skills: "",
        });
        navigate("/employer/all-jobs");
      })
      .catch((err) => {
        console.log(err.response);
        toast.danger(err.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container className="d-flex justify-content-center">
        <div className=" mt-3 card-lg py-5">
          <h3 className="">Post Job</h3>
          <h6 className="mb-0">Company Username : {company}</h6>
          {companyerror ? (
            <Form.Text className="text-danger">{companyerror}</Form.Text>
          ) : null}
          <Form method="POST">
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Job title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={handelchange("title")}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <div className="mb-3">
                    {data
                      ? data.map((data) => {
                          return (
                            <Form.Check
                              key={data.id}
                              inline
                              label={data.type_name}
                              name="userType"
                              value={data.type_name}
                              onChange={handelchange("type")}
                              type={"radio"}
                              id={`inline-radio-${data.id}`}
                            />
                          );
                        })
                      : null}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <div className="mb-3">
                    {cat
                      ? cat.map((cat) => {
                          return (
                            <Form.Check
                              key={cat.id}
                              inline
                              label={cat.cat_name}
                              name="cat"
                              value={cat.cat_name}
                              onChange={handelchange("category")}
                              type={"radio"}
                              id={`inline-radio-${cat.id}`}
                            />
                          );
                        })
                      : null}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Job Description</Form.Label>

              <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />
              <textarea
                style={{ display: "none" }}
                disabled
                ref={(val) => (textinfo.description = val)}
                value={draftToHtml(
                  convertToRaw(description.getCurrentContent())
                )}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>CTC (LPA)</Form.Label>
                  <div className="d-flex ">
                    <Form.Control
                      type="number"
                      value={minSalary}
                      onChange={handelchange("minSalary")}
                    />
                    <div className="input-group-middle">
                      <span className="input-group-text">to</span>
                    </div>
                    <Form.Control
                      type="number"
                      value={maxSalary}
                      onChange={handelchange("maxSalary")}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>CTC Breakup</Form.Label>
                  <div className="d-flex ">
                    <Form.Check
                      inline
                      label="in %"
                      name="ctcType"
                      value="percentage"
                      onChange={handelchange("ctcType")}
                      type={"radio"}
                      id={`ctc-radio-1`}
                    />
                    <Form.Check
                      inline
                      label="in LPA"
                      name="ctcType"
                      value="lpa"
                      onChange={handelchange("ctcType")}
                      type={"radio"}
                      id={`ctc-radio-2`}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fixed Pay</Form.Label>
                  <Form.Control
                    type="number"
                    value={fixed}
                    onChange={handelchange("fixed")}
                  />
                  <Form.Text className="text-muted">
                    Fixed Pay is fixed component of CTC
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Variable Pay</Form.Label>

                  <Form.Control
                    type="number"
                    value={variable}
                    onChange={handelchange("variable")}
                  />
                  <Form.Text className="text-muted">
                    Variable pay includes performance based cash bonus
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <div className="d-flex">
                    <Form.Check
                      inline
                      label="Remote"
                      name="remoteornot"
                      onChange={handelcheck}
                      type={"checkbox"}
                      id={`remoteornot`}
                    />
                    {!remote ? (
                      <Form.Control
                        type={locationType}
                        value={location}
                        onChange={handelchange("location")}
                      />
                    ) : null}
                  </div>
                  {!remote ? (
                    <Form.Check
                      inline
                      label="Relocation Assistance"
                      name="relocation"
                      onChange={handelreloc}
                      type="checkbox"
                      id={`relocation`}
                    />
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary Details</Form.Label>
                  <Form.Control
                    type="text"
                    value={pay}
                    onChange={handelchange("pay")}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Check
                  inline
                  label="Perks"
                  name="perks"
                  onChange={handelperks}
                  type={"checkbox"}
                  id={`perks`}
                />
                {perks ? (
                  <Fragment>
                    <Select
                      options={perkdata}
                      placeholder="Select Perks"
                      value={selectedOptions2}
                      onChange={handleSelect2}
                      isSearchable={true}
                      isMulti
                    />
                  </Fragment>
                ) : null}
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Skills</Form.Label>
                  <Select
                    options={skilldata}
                    placeholder="Select Skills"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Collabrators</Form.Label>
                  <ReactTags
                    tags={tags}
                    suggestions={[]}
                    allowNew
                    onDelete={handleDelete}
                    onAddition={handleAddition}
                  />
                  <Form.Text className="text-danger">{emailerror}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Button className="btn mt-2" onClick={submitform} type="submit">
              Post Job
            </Button>
          </Form>
        </div>
        <ToastContainer className="theToast" />
      </Container>
    </Layouts>
  );
}
