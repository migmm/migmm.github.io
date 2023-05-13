import config from '../config/config';
import UserModel from "../model/users/users";

const modelUsers = UserModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                  API Get                                  //
///////////////////////////////////////////////////////////////////////////////

const getUser = async (id:number) => {
    const user = await modelUsers.readUser(id);
    return user;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updatePassword = async (id:number, user:Object) => {
        const updatedUser = await modelUsers.updateUser(id, user);
        return updatedUser;    
};


export default {
    getUser,
    updatePassword,
};