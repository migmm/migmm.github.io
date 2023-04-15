import Joi from "joi";

class CertificationValidator {
    static validate(certification: object) {
        const certificationSchema = Joi.object({
            courseTitle: Joi.string().required(),
            description: Joi.string().required(),
            dateFrom: Joi.date().required(),
            dateTo: Joi.date().required(),
            urlCheck: Joi.string().required(),
            photos: Joi.array().required(),
        });
        const { error } = certificationSchema.validate(certification);
        return error;
    }
}

export default CertificationValidator;


