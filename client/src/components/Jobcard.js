import React from "react";
import { AiOutlineClockCircle, AiOutlineGoogle } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
export default function Jobcard(props) {
  const navigate = useNavigate();
  const jsPdfGenerate = () => {
    var doc = new jsPDF("p", "pt");

    doc.text(20, 20, "UI/UX Design Generated PDF");
    doc.setFontSize(700);
    doc.save("genrated.pdf");
  };
  return (
    <Link to={props.pagelink}>
      <div className="jobcard">
        <div className="d-flex justify-content-between">
          <h5>{props.title}</h5>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="subtitle m-0">{props.location}</p>
          <p>
            <AiOutlineClockCircle /> {props.date}
          </p>
        </div>

        <hr className="my-4 hrline" />
        <div className="desc">
          <p className="m-0">Type : {props.type}</p> <br />
          <p className="m-0">Category : {props.category}</p> <br />
          <p className="m-0">Salary : {props.salay}</p>
        </div>
        {/* <div className="company mt-5 mb-3">
          <div className="comicon-back">
            <Image src={props.image} className="comimg-sm" />
          </div>
          <p className="comname m-0">{props.compnay}</p>
        </div> */}
        <Button
          className="apply-btn"
          onClick={() => {
            navigate(props.pagelink);
          }}
        >
          Apply Now
        </Button>
      </div>
    </Link>
  );
}
