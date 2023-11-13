import Joi from 'joi';

const certificationSchema = Joi.object({
    courseTitle: Joi.string().required(),
    description: Joi.string().required(),
    issueDate: Joi.date(),
    vendor: Joi.string().required(),
    urlCheck: Joi.string().required(),
    courseImage: Joi.string().required(),
    type: Joi.string().required(),
});

export default certificationSchema;
