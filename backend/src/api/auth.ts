import config from '../config';
import UserModel from "../model/users/users";
import UserValidator from '../model/validators/user';

const modelAuth = UserModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getAuth = async (username:string) => {
    const user = await modelAuth.findByAny(username);
    return user;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createAuth = async (user:any) => {

        const validationError = UserValidator.validate(user);
    
        if(!validationError) {
            const createdUser = await modelAuth.createUser(user);
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