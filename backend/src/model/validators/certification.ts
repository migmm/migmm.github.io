import Joi from 'joi';

class CertificationValidator {
    static validate(certification: object) {
        const certificationSchema = Joi.object({
            courseTitle: Joi.string().required(),
            description: Joi.string().required(),
            dateFrom: Joi.date(),
            vendor: Joi.string().required(),
            dateTo: Joi.date(),
            urlCheck: Joi.string().required(),
            courseImage: Joi.string().required(),
        });
        const { error } = certificationSchema.validate(certification);
        return error;
    }
}

export default CertificationValidator;


