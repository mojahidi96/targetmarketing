const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInputs(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 400 })) {
    errors.text = 'Post text needs to be between 10-400 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
