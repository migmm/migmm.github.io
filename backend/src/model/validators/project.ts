import Joi from 'joi';

class ProjectValidator {
    static validate(project: object) {
        const projectSchema = Joi.object({
            projecName: Joi.string().required(),
            projectStatus: Joi.string().required(),
            showInLandPage: Joi.boolean().required(),
            gitURL: Joi.string().uri().required(),
            urlGithubRepo: Joi.string().uri().required(),
            deployURL: Joi.string().required(),
            shortDescription: Joi.string().required(),
            coverImage: Joi.string().required(),
            editorHtml: Joi.string().required(),
            created_at:  Joi.date(),
            modified_at:  Joi.date(),
        });
        const { error } = projectSchema.validate(project);
        return error;
    }
}

export default ProjectValidator;
