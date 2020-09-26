import * as Joi from 'joi';

const validateEmail = (data) => {
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        subject: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        body: Joi.string().min(5).max(500).required(),
        captcha: Joi.string().required(),
    };
    return Joi.validate(data, schema);
};

exports.validate = validateEmail;