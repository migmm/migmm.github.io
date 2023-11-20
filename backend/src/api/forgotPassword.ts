import database from '../config/database';
import UserModel from '../model/users/users';

const modelUsers = UserModel.get(database.PERSISTENCE_TYPE, 'Forgot Password');


///////////////////////////////////////////////////////////////////////////////
//                                  API Get                                  //
///////////////////////////////////////////////////////////////////////////////

const getUser = async (field:string, email:string) => {
    const user = await modelUsers.findByAny(field, email);
    return user;
};


export default getUser;