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
// const {getProduct, getProducts} = require('../api/products');
const projects_1 = __importDefault(require("../api/projects"));
////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////
const getProjects = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield projects_1.default.getProjects());
});
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = Number(req.params.id);
    const id = req.params.id;
    res.json(yield projects_1.default.getProject(id));
});
///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////
const postProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let project = req.body;
    const newProject = yield projects_1.default.createProject(project);
    res.json(newProject);
});
//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////
const putProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = Number(req.params.id);
    const id = req.params.id;
    const project = req.body;
    const updatedProject = (yield projects_1.default.updateProject(id, project)) || {};
    res.json(updatedProject);
});
///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = Number(req.params.id);
    const id = req.params.id;
    const removedProject = (yield projects_1.default.deleteProject(id)) || {};
    res.json(removedProject);
});
exports.default = {
    getProjects,
    getProject,
    postProject,
    putProject,
    deleteProject,
};
