import database from '../config/database';
import UserModel from '../model/users/users';

const modelUsers = UserModel.get(database.PERSISTENCE_TYPE, 'Auth');


///////////////////////////////////////////////////////////////////////////////
//                                  API Get                                  //
///////////////////////////////////////////////////////////////////////////////

const getAuth = async (field:string, username:string) => {
    const user = await modelUsers.findByAny(field, username);
    return user;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createAuth = async (user:any) => {
    const createdUser = await modelUsers.createUser(user);
    return createdUser;
};

///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateUser = async (id:number, user:any) => {
    const updatedUser = await modelUsers.updateUser(id, user);
    return updatedUser;    
};


export default {
    getAuth,
    createAuth,
    updateUser,
};