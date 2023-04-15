import config from '../config';
import UserModel from "../model/users/users";
import UserValidator from '../model/validators/user';

const modelUsers = UserModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////

const getUsers = async () => {
    const users = await modelUsers.readUsers();
    return users;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get ONE                                //
///////////////////////////////////////////////////////////////////////////////

const getUser = async (id:number) => {
    const user = await modelUsers.readUser(id);
    return user;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const createUser = async (user:any) => {

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


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateUser = async (id:number, user:any) => {

    const validationError = UserValidator.validate(user);

    if(!validationError) {
        const updatedUser = await modelUsers.updateUser(id, user);
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
    const removedUser = await modelUsers.deleteUser(id);
    return removedUser;
};


export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
