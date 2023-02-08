"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projects_1 = __importDefault(require("../controller/projects"));
const routerProjects = express_1.default.Router();
routerProjects.get('/', projects_1.default.getProjects);
routerProjects.get('/:id', projects_1.default.getProject);
routerProjects.post('/', projects_1.default.postProject);
routerProjects.put('/:id', projects_1.default.putProject);
routerProjects.delete('/:id', projects_1.default.deleteProject);
exports.default = routerProjects;
