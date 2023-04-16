import config from '../config';
import UserModel from "../model/users/users";
import UserValidator from '../model/validators/user';

const modelAuth = UserModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getAuths = async () => {
    const auth = await modelAuth.readUsers();
    return auth;
};


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


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateAuth = async (id:number, user:any) => {

    const validationError = UserValidator.validate(user);

    if(!validationError) {
        const updatedUser = await modelAuth.updateUser(id, user);
        return updatedUser;    
    } else {
        console.log(validationError);
        console.error(`Error validating updateUser: ${validationError.details[0].message}`);
        return {};
    }
};


///////////////////////////////////////////////////////////////////////////////
//                                API Delete                                 //
///////////////////////////////////////////////////////////////////////////////

const deleteAuth = async (id:number) => {
    const removedUser = await modelAuth.deleteUser(id);
    return removedUser;
};


export default {
    getAuths,
    getAuth,
    createAuth,
    updateAuth,
    deleteAuth
};