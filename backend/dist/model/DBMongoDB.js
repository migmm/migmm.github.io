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
const mongoose_1 = __importDefault(require("mongoose"));
//import { any, string } from 'joi';
class DBMongoDB {
    static getObjectWithId(obj) {
        if (Array.isArray(obj)) {
            obj.forEach(el => {
                el.id = el[DBMongoDB.primaryKey];
                delete el[DBMongoDB.primaryKey];
            });
        }
        else {
            obj.id = obj[DBMongoDB.primaryKey];
            delete obj[DBMongoDB.primaryKey];
        }
        return obj;
    }
    static connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongoose_1.default.connection.readyState === DBMongoDB.READY_STATE_CONNECTED) {
                    return true;
                }
                mongoose_1.default.connect(config_1.default.MONGODB_CONNECTION_STR);
                console.log('Conexión con MongoDB exitosa.');
                return true;
            }
            catch (error) {
                console.error(`Error al intentar establecer la conexión con MongoDB. Detalle: ${error.message}`);
                return false;
            }
        });
    }
}
DBMongoDB.READY_STATE_DISCONNECTED = 0;
DBMongoDB.READY_STATE_CONNECTED = 1;
DBMongoDB.READY_STATE_CONNECTING = 2;
DBMongoDB.READY_STATE_DISCONNECTING = 3;
DBMongoDB.primaryKey = '_id';
exports.default = DBMongoDB;
