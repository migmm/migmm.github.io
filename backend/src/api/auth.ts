import config from '../config';
import UserModel from "../model/users/users";
import UserValidator from '../model/validators/user';

const modelAuth = UserModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getAuth = async () => {
    const auth = await modelAuth.readUsers();
    return auth;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getUser = async (username:string) => {
    const user = await modelAuth.findUserName(username);
    return user;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createUser = async (user:any) => {

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

const updateUser = async (id:number, user:any) => {

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

const deleteUser = async (id:number) => {
    const removedUser = await modelAuth.deleteUser(id);
    return removedUser;
};


export default {
    getAuth,
    getUser,
    createUser,
    updateUser,
    deleteUser
};