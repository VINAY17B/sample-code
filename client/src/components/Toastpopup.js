import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function Toastpopup(props) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast>
        <Toast.Header className={props.toastType}>
          <strong className="me-auto">JobSearch</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>{props.message}.</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
