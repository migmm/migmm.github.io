import mongoose from 'mongoose';
import DBMongoDB from '../../db/DBMongoDB';

const configSchema = new mongoose.Schema(
    {
        name: String,
        jobTitle: String,
        location: String,
        githubURL: String,
        linkedinURL: String,
        email: String,
        whatsappNumber: String,
        telegramId: String,
        youtubeChannel: String,
        logo: String,
    },
    {
        versionKey: false,
    }
);

mongoose.set('strictQuery', false);

const ConfigsModel = mongoose.model('configs', configSchema);

class ConfigModelMongoDB {
    // CRUD - C: CREATE
    async createWebConfig(config: any) {
        await DBMongoDB.getInstance();
        try {
            const newConfig = new ConfigsModel(config);
            await newConfig.save();
            return DBMongoDB.getObjectWithId(newConfig.toObject());
        } catch (error: any) {
            console.error(`Error adding config: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    async readWebConfigs() {
        await DBMongoDB.getInstance();
        try {
            const configs = await ConfigsModel.find({}).lean();
            return DBMongoDB.getObjectWithId(configs);
        } catch (error: any) {
            console.error(`Error getting configs: ${error.message}`);
            return [];
        }
    }

    async readWebConfig(id: any) {
        await DBMongoDB.getInstance();
        try {
            const product = (await ConfigsModel.findById(id).lean()) || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error: any) {
            console.error(`Error getting prject: ${error.message}`);
            return {};
        }
    }

     // Route to find by any value in database
    async findByAny(field: any, value: any) {
        await DBMongoDB.getInstance();
        try {
            const user = await ConfigsModel.findOne({ [field]: value }).exec();
            return user ? DBMongoDB.getObjectWithId(user) : '';
        } catch (error: any) {
            console.error(`Error getting user: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateWebConfig(id: number, config: any) {
        await DBMongoDB.getInstance();
        try {
            const updatedConfig = await ConfigsModel.findByIdAndUpdate(
                id,
                { $set: config },
                {
                    returnDocument: 'after',
                }
            ).lean();
            return DBMongoDB.getObjectWithId(updatedConfig);
        } catch (error: any) {
            console.error(`Error updating config: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteWebConfig(id: number) {
        await DBMongoDB.getInstance();
        try {
            const deletedConfig = await ConfigsModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedConfig);
        } catch (error: any) {
            console.error(`Error deleting configo: ${error.message}`);
            return {};
        }
    }
}

export default ConfigModelMongoDB;
