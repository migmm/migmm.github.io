"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DBMongoDB_1 = __importDefault(require("./DBMongoDB"));
// Esquema del documento Product
const projectSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    price: Number
});
// Modelo del documento almacenado en una colección
const ProjectsModel = mongoose_1.default.model('projects', projectSchema);
class ProjectModelMongoDB {
    // CRUD - C: CREATE
    createProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield DBMongoDB_1.default.connectDB())) {
                return {};
            }
            try {
                const newProject = new ProjectsModel(project);
                yield newProject.save();
                return DBMongoDB_1.default.getObjectWithId(newProject.toObject());
            }
            catch (error) {
                console.error(`Error al intentar dar de alta el projecto: ${error.message}`);
                return {};
            }
        });
    }
    // CRUD - R: READ
    readProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield DBMongoDB_1.default.connectDB())) {
                return [];
            }
            try {
                const projects = yield ProjectsModel.find({}).lean();
                return DBMongoDB_1.default.getObjectWithId(projects);
            }
            catch (error) {
                console.error(`Error al intentar obtener los productos: ${error.message}`);
                return [];
            }
        });
    }
    readProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield DBMongoDB_1.default.connectDB())) {
                return {};
            }
            try {
                // const product = await ProductsModel.find({_id: id});
                // const product = await ProductsModel.findOne({_id: id});
                const product = (yield ProjectsModel.findById(id).lean()) || {};
                return DBMongoDB_1.default.getObjectWithId(product);
            }
            catch (error) {
                console.error(`Error al intentar obtener el producto: ${error.message}`);
                return {};
            }
        });
    }
    // CRUD - U: UPDATE
    updateProject(id, project) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield DBMongoDB_1.default.connectDB())) {
                return {};
            }
            try {
                // await ProductsModel.updateOne({_id: id}, {$set: product});
                // const updatedProduct = await ProductsModel.findOneAndUpdate({_id: id}, {$set: product});
                // const updatedProduct = await ProductsModel.findOneAndUpdate({_id: id}, {$set: product}, {
                //     returnDocument: 'after'
                // });
                // const updatedProduct = await ProductsModel.findByIdAndUpdate(id, {$set: product});
                const updatedProject = yield ProjectsModel.findByIdAndUpdate(id, { $set: project }, {
                    returnDocument: 'after'
                }).lean();
                return DBMongoDB_1.default.getObjectWithId(updatedProject);
            }
            catch (error) {
                console.error(`Error al intentar actualizar el projecto: ${error.message}`);
                return {};
            }
        });
    }
    // CRUD - D: DELETE
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield DBMongoDB_1.default.connectDB())) {
                return {};
            }
            try {
                // await ProjectsModel.deleteOne({_id: id});
                const deletedProject = yield ProjectsModel.findByIdAndDelete(id).lean();
                return DBMongoDB_1.default.getObjectWithId(deletedProject);
            }
            catch (error) {
                console.error(`Error al intentar eliminar el projecto: ${error.message}`);
                return {};
            }
        });
    }
}
exports.default = ProjectModelMongoDB;
