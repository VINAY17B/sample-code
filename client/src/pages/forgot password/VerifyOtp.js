import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Layouts from "../../components/Layouts";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { fortoken, isAuth } from "../../core/helpers";
import axios from "axios";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [values, setValues] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    disable: true,
  });
  const [otpnum, setOtp] = useState({});
  const { otp1, otp2, otp3, otp4 } = values;
  const handelchange = (text) => (e) => {
    setValues({ ...values, [text]: e.target.value });
  };
  const inputfocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      console.log("next");

      const next = e.target.tabIndex;
      if (next < 4) {
        e.target.form.elements[next].focus();
      }
      if (next === 4) {
        setOtp(otp1 + otp2 + otp3 + otp4);
      }
    }
  };
  const submitform = (e) => {
    e.preventDefault();
    // setOtp(otp1 + otp2 + otp3 + otp4);
    console.log("hello", otpnum);

    localStorage.removeItem("temp-login-data");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/otp-verification/${userId}`,
      data: { otp: otpnum },
    })
      .then((response) => {
        fortoken(response, () => {
          alert("OTP Verified");
          navigate("/reset-password");
        });
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.error);
        navigate("/login");
      });
  };
  return (
    <Layouts>
      <Container className="d-flex justify-content-center   align-items-center">
        <div className=" mt-5 authcard py-5">
          <h3 className="my-3">OTP VERIFICATION</h3>
          {isAuth() ? <Navigate to="/" /> : null}
          <form method="POST">
            <div className="d-flex justify-content-center">
              <input
                name="otp1"
                type="text"
                autoComplete="off"
                className="otpInput"
                value={otp1}
                onChange={handelchange("otp1")}
                tabIndex="1"
                maxLength="1"
                onKeyUp={inputfocus}
              />
              <input
                name="otp2"
                type="text"
                autoComplete="off"
                className="otpInput"
                value={otp2}
                onChange={handelchange("otp2")}
                tabIndex="2"
                maxLength="1"
                onKeyUp={inputfocus}
              />
              <input
                name="otp3"
                type="text"
                autoComplete="off"
                className="otpInput"
                value={otp3}
                onChange={handelchange("otp3")}
                tabIndex="3"
                maxLength="1"
                onKeyUp={inputfocus}
              />
              <input
                name="otp4"
                type="text"
                autoComplete="off"
                className="otpInput"
                value={otp4}
                onChange={handelchange("otp4")}
                tabIndex="4"
                maxLength="1"
                onKeyUp={inputfocus}
              />
            </div>
            <Button
              className="btn mt-2"
              size="lg"
              onClick={submitform}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </Layouts>
  );
}
