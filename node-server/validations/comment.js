const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInputs(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 2, max: 200 })) {
    errors.text = 'Comment text needs to be between 2-200 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
