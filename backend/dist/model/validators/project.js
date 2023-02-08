"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class ProductValidator {
    static validate(product) {
        const productSchema = joi_1.default.object({
            name: joi_1.default.string().min(3).max(20).required(),
            price: joi_1.default.number().required(),
            description: joi_1.default.string().required(),
        });
        const { error } = productSchema.validate(product);
        return error;
    }
}
exports.default = ProductValidator;
