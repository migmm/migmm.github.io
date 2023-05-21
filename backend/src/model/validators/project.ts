import Joi from 'joi';

class ProjectValidator {
    static validate(project: object) {
        const projectSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            languajes: Joi.array().required(),
            urlDeploy: Joi.string().required(),
            urlGithubRepo: Joi.string().required(),
            photos: Joi.array().required(),
        });
        const { error } = projectSchema.validate(project);
        return error;
    }
}

export default ProjectValidator;
