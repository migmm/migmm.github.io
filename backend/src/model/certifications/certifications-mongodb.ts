import mongoose from 'mongoose';
import DBMongoDB from '../../dbs/DBMongoDB';


const certificationSchema = new mongoose.Schema(
    {
        courseTitle: String,
        description: String,
        vendor: String, 
        issueDate: Date,
        urlCheck: String,
        courseImage: Array,
        created_at: { 
            type: Date, 
            default: Date.now 
        },
        modified_at: { 
            type: Date, 
            default: Date.now 
        },
        type: String,
        storage: String,
    },
    {
        versionKey: false,
    }
);

mongoose.set('strictQuery', false);

const CertificationsModel = mongoose.model('certifications', certificationSchema);


class CertificationModelMongoDB {
    // CRUD - C: CREATE
    async createCertification(certification: object) {
        await DBMongoDB.getInstance();
        try {
            const newCertification = new CertificationsModel(certification);
            await newCertification.save();
            return DBMongoDB.getObjectWithId(newCertification.toObject());
        } catch (error: any) {
            console.error(`Error adding certification: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    async readCertifications() {
        await DBMongoDB.getInstance();
        try {
            const certifications = await CertificationsModel.find({}).lean();
            return DBMongoDB.getObjectWithId(certifications);
        } catch (error: any) {
            console.error(`Error getting certifications: ${error.message}`);
            return [];
        }
    }

    async readCertification(id: string) {
        await DBMongoDB.getInstance();
        try {
            const product = (await CertificationsModel.findById(id).lean()) || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error: any) {
            console.error(`Error getting certification: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateCertification(id: string, certification: object) {
        await DBMongoDB.getInstance();
        try {
            const updatedCertification = await CertificationsModel.findByIdAndUpdate(
                id,
                { $set: certification },
                {
                    returnDocument: 'after',
                }
            ).lean();
            return DBMongoDB.getObjectWithId(updatedCertification);
        } catch (error: any) {
            console.error(`Error updating certification: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteCertification(id: string) {
        await DBMongoDB.getInstance();
        try {
            const deletedCertification = await CertificationsModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedCertification);
        } catch (error: any) {
            console.error(`Error deleting certificationo: ${error.message}`);
            return {};
        }
    }
}

export default CertificationModelMongoDB;
