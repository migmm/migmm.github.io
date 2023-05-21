import database from '../config/database';
import UserModel from '../model/users/users';
import UserValidator from '../model/validators/user';

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

        const validationError = UserValidator.validate(user);

        if(!validationError) {
            const createdUser = await modelUsers.createUser(user);
            return createdUser;
        } else {
            console.log(validationError);
            console.error(`Error validating createUser: ${validationError.details[0].message}`);
            return {};
        }
};


export default {
    getAuth,
    createAuth,
};