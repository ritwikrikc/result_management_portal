const joi = require("joi");


const registerValidation = (data) => {
  // validate register request data
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
    role: joi.number()
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  // validate login request data
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const studentLoginValidation = (data) => {
    // validate login request data
    const schema = joi.object({
      roll_no: joi.number().integer().required(),
      email: joi.string().email().required(),
    });
  
    return schema.validate(data);
  };

  
  module.exports.registerValidation = registerValidation;
  module.exports.loginValidation = loginValidation;
  module.exports.studentLoginValidation = studentLoginValidation;