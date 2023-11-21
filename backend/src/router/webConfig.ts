import express from 'express';
import webConfigController from '../controller/webConfig';
import authRole from '../middlewares/authRole';


const routerWebConfig = express.Router();


routerWebConfig.get('/', webConfigController.getWebConfigs);
routerWebConfig.get('/:id', authRole(['admin']) as any,  webConfigController.getWebConfig);
routerWebConfig.post('/', authRole(['admin']) as any, webConfigController.postWebConfig);
routerWebConfig.put('/:id',authRole(['admin', 'user']) as any,  webConfigController.putWebConfig);
routerWebConfig.delete('/:id', authRole(['admin']) as any, webConfigController.deleteWebConfig);


export default routerWebConfig;
