import Joi from "joi";

class ProductValidator {
    
    static validate(product:any) {

        const productSchema = Joi.object({
            name: Joi.string(),
            description:Joi.string(),
            languajes: Joi.array(),
            urlDeploy: Joi.string(),
            urlGithubRepo: Joi.string(),
            photos: Joi.array(),
        });
        const { error } = productSchema.validate(product);
        return error;
    }
}

export default ProductValidator;
