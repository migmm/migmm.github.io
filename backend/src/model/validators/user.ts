import Joi from "joi";

class ProjectValidator {
    static validate(project: object) {
        const projectSchema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(6).max(32).required(),
            mail: Joi.string().required(),
            role: Joi.string().required(),
        });
        const { error } = projectSchema.validate(project);
        return error;
    }
}

export default ProjectValidator;
