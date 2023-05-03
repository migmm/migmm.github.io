import Joi from 'joi';

import userStatus from '../../config/userStatus';
import rolesPermissions from '../../config/userRoles';
const allowedRoles = Object.keys(rolesPermissions);


class ProjectValidator {
    static validate(project: object) {
        const projectSchema = Joi.object({
            id: Joi.object(),
            username: Joi.string().required(),
            password: Joi.string().min(6).max(1000).required(),
            email: Joi.string().required(),
            role: Joi.string().valid(...allowedRoles).default('user'),
            status: Joi.string().valid(...userStatus).default('active')
        });
        const { error } = projectSchema.validate(project);
        return error;
    }
}

export default ProjectValidator;