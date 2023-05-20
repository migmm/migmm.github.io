import database, { PERSISTENCE_TYPES } from "../../config/database";
import UserModelMongoDB from "./users-mongodb";

class UserModel {
    static get(type: any) {
        console.log(`#### Persistence -> ${database.PERSISTENCE_TYPE || "by default"} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return UserModelMongoDB;
            default:
                return UserModelMongoDB;
        }
    }
}

export default UserModel;
