const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function ValidateAttendee(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.meetup_id = !isEmpty(data.meetup_id) ? data.meetup_id : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.meetup_id)) {
    errors.meetup_id = "Meetup ID is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
