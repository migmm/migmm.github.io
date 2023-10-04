import mongoose from 'mongoose';
import DBMongoDB from '../../db/DBMongoDB';

const certificationSchema = new mongoose.Schema(
    {
        courseTitle: String,
        description: String,
        vendor: String, 
        dateFrom: String,
        dateTo: String,
        urlCheck: String,
        courseImage: String,
        created_at: { 
            type: Date, 
            default: Date.now 
        },
        modified_at: { 
            type: Date, 
            default: Date.now 
        },
    },
    {
        versionKey: false,
    }
);

mongoose.set('strictQuery', false);

const CertificationsModel = mongoose.model('certifications', certificationSchema);

class CertificationModelMongoDB {
    // CRUD - C: CREATE
    async createCertification(certification: any) {
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

    async readCertification(id: any) {
        await DBMongoDB.getInstance();
        try {
            const product = (await CertificationsModel.findById(id).lean()) || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error: any) {
            console.error(`Error getting prject: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateCertification(id: number, certification: any) {
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
    async deleteCertification(id: number) {
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
