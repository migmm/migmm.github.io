import database from '../config/database';
import UserModel from '../model/users/users';

const modelUsers = UserModel.get(database.PERSISTENCE_TYPE, 'Favourites');


///////////////////////////////////////////////////////////////////////////////
//                                  API Get                                  //
///////////////////////////////////////////////////////////////////////////////

const getUser = async (id:number) => {
    const user = await modelUsers.readUser(id);
    return user;
};

const getFavUser = async (field:string, username:string) => {
    const user = await modelUsers.findByAny(field, username);
    return user;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Create                                 //
///////////////////////////////////////////////////////////////////////////////

const addFavourite = async (user:any) => {
            const newFavourite = await modelUsers.createUser(user);
            return newFavourite;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Update                                 //
///////////////////////////////////////////////////////////////////////////////

const updateUser = async (id:number, user:any) => {
        const updatedUser = await modelUsers.updateUser(id, user);
        return updatedUser;    
};


export default {
    getFavUser,
    addFavourite,
    getUser,
    updateUser,
};