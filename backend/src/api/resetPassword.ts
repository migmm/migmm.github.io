import database from '../config/database';
import UserModel from '../model/users/users';

const modelUsers= UserModel.get(database.PERSISTENCE_TYPE, 'Reset Password');


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