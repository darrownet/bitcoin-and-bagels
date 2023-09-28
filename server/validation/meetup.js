const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function ValidateMeetup(data){
  let errors = {}

  data.date = !isEmpty(data.date) ? data.date : "";
  data.title = !isEmpty(data.title) ? data.title : "";

  if (Validator.isEmpty(data.date)) {
    errors.date = "Date is required";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
