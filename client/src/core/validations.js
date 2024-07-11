
export const validation = (key, value) => {
  switch (key) {
    case "email":
      return isEmail(value);
    case "password":
      return isPassword(value);
    case "number":
      return isNumber(value);
    case "name":
      return isName(value);

    default:
      break;
  }
};
export const isEmail = (item) => {
  if (!item.includes("@") || !item.includes(".")) {
    return "Please enter Valid email";
  } else {
    return "";
  }
};
export const isNumber = (item) => {
  if (isNaN(item)) {
    return "Please enter only numbers";
  } else {
    return "";
  }
};
export const isPhone = (item) => {};
export const isPassword = (item) => {
  if (item.length < 6) {
    return "Password is too short";
  } else {
    return "";
  }
};

export const isName = (item) => {
  if (item.length <= 3) {
    return "Name should contain atleast 4 character";
  } else {
    return "";
  }
};
