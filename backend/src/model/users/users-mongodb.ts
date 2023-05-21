import mongoose from 'mongoose';
import DBMongoDB from '../../db/DBMongoDB';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            minlength: 6,
        },
        email: {
            type: String,
            unique: true,
        },
        role: {
            type: String,
            default: 'user',
        },
        status: {
            type: String,
            default: 'active',
        },
        projects: {
            type : [
                { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'projects' 
                }
            ],
        },
        certifications: {
            type : [
                { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'certifications' 
                }
            ],
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        modified_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

mongoose.set('strictQuery', false);

const UsersModel = mongoose.model('users', userSchema);

class UserModelMongoDB {
    // CRUD - C: CREATE
    static async createUser(user: any) {
        await DBMongoDB.getInstance();
        try {
            const newUser = new UsersModel(user);
            await newUser.save();
            return DBMongoDB.getObjectWithId(newUser.toObject());
        } catch (error: any) {
            console.error(`Error adding user: ${error.message}`);
            return {};
        }
    }

    // CRUD - R: READ
    static async readUsers() {
        await DBMongoDB.getInstance();
        try {
            const users = await UsersModel.find({})
            .populate({ path: 'certifications', options: { strictPopulate: false } })
            .populate({ path: 'projects', options: { strictPopulate: false } })
            .exec();
            return DBMongoDB.getObjectWithId(users);
        } catch (error: any) {
            console.error(`Error getting users: ${error.message}`);
            return [];
        }
    }

    static async readUser(id: any) {
        await DBMongoDB.getInstance();
        try {
            const user = await UsersModel.findById(id).lean();
            return DBMongoDB.getObjectWithId(user);
        } catch (error: any) {
            console.error(`Error getting user: ${error.message}`);
            return {};
        }
    }

    // Route to find by any value in database
    static async findByAny(field: any, value: any) {
        await DBMongoDB.getInstance();
        try {
            const user = await UsersModel.findOne({ [field]: value }).exec();
            return user ? DBMongoDB.getObjectWithId(user) : {};
        } catch (error: any) {
            console.error(`Error getting user: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    static async updateUser(id: number, user: any) {
        await DBMongoDB.getInstance();
        try {
            const updatedUser = await UsersModel.findByIdAndUpdate(id, { $set: user }, { returnDocument: 'after' }).lean();
            return DBMongoDB.getObjectWithId(updatedUser);
        } catch (error: any) {
            console.error(`Error updating user: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    static async deleteUser(id: number) {
        await DBMongoDB.getInstance();
        try {
            const deletedUser = await UsersModel.findByIdAndDelete(id).lean();
            return DBMongoDB.getObjectWithId(deletedUser);
        } catch (error: any) {
            console.error(`Error deleting user: ${error.message}`);
            return {};
        }
    }
}

export default UserModelMongoDB;
