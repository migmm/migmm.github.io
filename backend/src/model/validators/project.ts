import Joi from 'joi';

const projectSchema = Joi.object({
    id: Joi.string().optional(),
    projectName: Joi.string().required(),
    projectStatus: Joi.string().required(),
    showInLandPage: Joi.boolean(),
    gitURL: Joi.string().uri().required(),
    deployURL: Joi.string().uri().required(),
    shortDescription: Joi.string().required(),
    coverImage: Joi.string().required(),
    editorHtml: Joi.string().required(),
    created_at: Joi.date(),
    modified_at: Joi.date(),
    tags: Joi.string().required(),
});


export default projectSchema;
