import Joi from "joi";
import allowedRoles from '../../config/userRoles';
class ProjectValidator {
    static validate(project: object) {
        const projectSchema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(6).max(1000).required(),
            email: Joi.string().required(),
            role: Joi.string().valid(...allowedRoles).default('user'),
            banned: Joi.boolean().default(false)
        });
        const { error } = projectSchema.validate(project);
        return error;
    }
}

export default ProjectValidator;