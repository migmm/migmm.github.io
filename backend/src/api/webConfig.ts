import database from '../config/database';
import WebConfigModel from '../model/config/config';
import WebConfigValidator from '../model/validators/webConfig';

const modelWebConfigs = WebConfigModel.get(database.PERSISTENCE_TYPE);


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

const getWebConfig = async (id:number) => {
    const webConfig = await modelWebConfigs.readWebConfig(id);
    return webConfig;
};

const getByField = async (field:string, value: string) => {
    const webConfig = await modelWebConfigs.findByAny(field, value);
    return webConfig;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createWebConfig = async (webConfig:any) => {

        const validationError = WebConfigValidator.validate(webConfig);
    
        if(!validationError) {
            const createdWebConfig = await modelWebConfigs.createWebConfig(webConfig);
            return createdWebConfig;  
        } else {
            console.log(validationError);
            console.error(`Error validating createWebConfig: ${validationError.details[0].message}`);
            return {};
        }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateWebConfig = async (id:number, webConfig:any) => {

    const validationError = WebConfigValidator.validate(webConfig);

    if(!validationError) {
        const updatedWebConfig = await modelWebConfigs.updateWebConfig(id, webConfig);
        return updatedWebConfig;    
    } else {
        console.log(validationError);
        console.error(`Error validating updateWebConfig: ${validationError.details[0].message}`);
        return {};
    }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteWebConfig = async (id:number) => {
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
