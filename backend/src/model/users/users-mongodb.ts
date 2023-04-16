import mongoose from "mongoose";
import DBMongoDB from "../DBMongoDB";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: { 
            type: String, 
            minlength: 6, 
            required: true 
        },
        mail: {
            type: String,
            unique: true,
            required: true,
        },
        role: { 
            type: String, 
            default: "Basic", 
            required: true },
    },
    {
        versionKey: false,
    }
);

mongoose.set("strictQuery", false);

const UsersModel = mongoose.model("users", userSchema);

class UserModelMongoDB {
    // CRUD - C: CREATE
    async createUser(user: any) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
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
    async readUsers() {
        if (!(await DBMongoDB.connectDB())) {
            return [];
        }
        try {
            const users = await UsersModel.find({}).lean();
            return DBMongoDB.getObjectWithId(users);
        } catch (error: any) {
            console.error(`Error getting users: ${error.message}`);
            return [];
        }
    }

    async readUser(id: any) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
        try {
            const product = (await UsersModel.findById(id).lean()) || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error: any) {
            console.error(`Error getting user: ${error.message}`);
            return {};
        }
    }

    // Route to find by any value in database
    async findByAny(value: any) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
        try {
            const product = (await UsersModel.findOne({value}).lean()) || {};
            return DBMongoDB.getObjectWithId(product);
        } catch (error: any) {
            console.error(`Error getting user: ${error.message}`);
            return {};
        }
    }

    // CRUD - U: UPDATE
    async updateUser(id: number, user: any) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
        try {
            const updatedUser = await UsersModel.findByIdAndUpdate(
                id,
                { $set: user },
                {
                    returnDocument: "after",
                }
            ).lean();
            return DBMongoDB.getObjectWithId(updatedUser);
        } catch (error: any) {
            console.error(`Error updating user: ${error.message}`);
            return {};
        }
    }

    // CRUD - D: DELETE
    async deleteUser(id: number) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
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