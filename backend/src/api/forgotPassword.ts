import database from '../config/database';
import UserModel from "../model/users/users";

const userModel = UserModel.get(database.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                  API Get                                  //
///////////////////////////////////////////////////////////////////////////////

const getUser = async (field:string, email:string) => {
    const user = await userModel.findByAny(field, email);
    return user;
};

export default getUser;