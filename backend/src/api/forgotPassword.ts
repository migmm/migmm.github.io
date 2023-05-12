import config from '../config/config';
import UserModel from "../model/users/users";

const userModel = UserModel.get(config.PERSISTENCE_TYPE);


///////////////////////////////////////////////////////////////////////////////
//                                  API Get                                  //
///////////////////////////////////////////////////////////////////////////////

const getUser = async (field:string, email:string) => {
    const user = await userModel.findByAny(field, email);
    return user;
};

export default getUser;