import Joi from "joi";

class ProjectValidator {
    static validate(project: object) {
        const projectSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            languajes: Joi.array(),
            urlDeploy: Joi.string(),
            urlGithubRepo: Joi.string(),
            photos: Joi.array(),
        });
        const { error } = projectSchema.validate(project);
        return error;
    }
}

export default ProjectValidator;
