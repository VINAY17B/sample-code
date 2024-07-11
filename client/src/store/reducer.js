import { configureStore } from "@reduxjs/toolkit";
const initialState = {
  employer: [],
  employee: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER-Employer":
      return {
        ...state,
        employer: [...state.employer, action.payload],
      };
    case "REGISTER-Employee":
      return {
        ...state,
        employee: [...state.employee, action.payload],
      };
    default:
      return state;
  }
};

export default configureStore({ reducer });
