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
const config_1 = __importDefault(require("../config"));
const projects_1 = __importDefault(require("../model/projects"));
const project_1 = __importDefault(require("../model/validators/project"));
const modelProjects = projects_1.default.get(config_1.default.PERSISTENCE_TYPE);
///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////
const getProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield modelProjects.readProjects();
    return projects;
});
///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////
const getProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield modelProjects.readProject(id);
    return project;
});
///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////
const createProject = (project) => __awaiter(void 0, void 0, void 0, function* () {
    const createdProject = yield modelProjects.createProject(project);
    return createdProject;
});
///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////
const updateProject = (id, project) => __awaiter(void 0, void 0, void 0, function* () {
    const validationError = project_1.default.validate(project);
    if (!validationError) {
        const updatedProject = yield modelProjects.updateProject(id, project);
        return updatedProject;
    }
    else {
        console.log(validationError);
        console.error(`Error de validación en updateProject: ${validationError.details[0].message}`);
        return {};
    }
});
///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const removedProject = yield modelProjects.deleteProject(id);
    return removedProject;
});
exports.default = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
};
