import database from '../config/database';
import WebConfigModel from '../model/webConfig/config';

const modelWebConfigs = WebConfigModel.get(database.PERSISTENCE_TYPE, 'Web config');


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getWebConfigs = async () => {
    const webConfigs = await modelWebConfigs.readWebConfigs();
    return webConfigs;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getWebConfig = async (id: number) => {
    const webConfig = await modelWebConfigs.readWebConfig(id);
    return webConfig;
};

const getByField = async (field: string, value: string) => {
    const webConfig = await modelWebConfigs.findByAny(field, value);
    return webConfig;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createWebConfig = async (webConfig: any) => {
    const createdWebConfig = await modelWebConfigs.createWebConfig(webConfig);
    return createdWebConfig;  
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateWebConfig = async (id: number, webConfig: any) => {
    const updatedWebConfig = await modelWebConfigs.updateWebConfig(id, webConfig);
    return updatedWebConfig;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteWebConfig = async (id: number) => {
    const removedWebConfig = await modelWebConfigs.deleteWebConfig(id);
    return removedWebConfig;
};


export default {
    getWebConfigs,
    getWebConfig,
    getByField,
    createWebConfig,
    updateWebConfig,
    deleteWebConfig
};
