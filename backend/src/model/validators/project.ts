import Joi from 'joi';

const projectSchema = Joi.object({
    id: Joi.string().optional(),
    projectName: Joi.string().required(),
    projectStatus: Joi.string().required(),
    showInLandPage: Joi.boolean(),
    gitURL: Joi.string().uri().required(),
    deployURL: Joi.string().uri(),
    shortDescription: Joi.string().required(),
    coverImage: Joi.string().required(),
    editorHtml: Joi.string().required(),
    created_at: Joi.date().optional(),
    modified_at: Joi.date().optional(),
    titleCheck: Joi.string().optional(),
    tags: Joi.string().required(),
});


export default projectSchema;
