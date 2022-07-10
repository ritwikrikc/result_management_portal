const joi = require("joi");


const studentLoginValidation = (data) => {
    // validate login request data
    const schema = joi.object({
      roll_no: joi.number().integer().required(),
      email: joi.string().email().required(),
    });
  
    return schema.validate(data);
  };

  module.exports.studentLoginValidation = studentLoginValidation;