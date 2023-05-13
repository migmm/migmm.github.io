import config from '../config/config';
import UserModel from "../model/users/users";
//import UserValidator from '../model/validators/user';

const modelUsers = UserModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                  API Get                                  //
///////////////////////////////////////////////////////////////////////////////

const getUser = async (id:number) => {
    const user = await modelUsers.readUser(id);
    return user;
};

/* const getUserByAny = async (field:string, email:string) => {
    const user = await modelUsers.findByAny(field, email);
    return user;
};
 */

///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updatePassword = async (id:number, user:Object) => {

    // const validationError = UserValidator.validate(user);


    //if(!validationError) {
        const updatedUser = await modelUsers.updateUser(id, user);
        return updatedUser;    
  /*   } else {
        console.log(validationError);
        console.error(`Error validating updatePassword: ${validationError.details[0].message}`);
        return {};
    } */
};


export default {
    getUser,
    updatePassword,
};