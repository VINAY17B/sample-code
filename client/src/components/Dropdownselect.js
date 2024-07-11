import React, { Fragment } from "react";
import Form from "react-bootstrap/Form";
export default function Dropdownselect(props) {
  return (
    <Fragment>
      <h6>{props.typetext} :</h6>
      <Form.Select>
        <option disabled selected>
          select
        </option>
        <option>{props.o1}</option>
        <option>{props.o2}</option>
      </Form.Select>
    </Fragment>
  );
}
