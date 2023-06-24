import Joi from 'joi';

class WebConfigValidator {
    static validate(WebConfig: object) {
        const projectSchema = Joi.object({
            name: Joi.string().required(),
            jobTitle: Joi.string().required(),
            location: Joi.string().required(),
            githubURL: Joi.string().required(),
            linkedinURL: Joi.string().required(),
            email: Joi.string().required(),
            whatsappNumber: Joi.string(),
            telegramId: Joi.string(),
            youtubeChannel: Joi.string(),
            logo: Joi.string().required(),
        });
        const { error } = projectSchema.validate(WebConfig);
        return error;
    }
}

export default WebConfigValidator;
