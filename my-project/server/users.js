import { User } from './main_db.js';
import { createUser } from './user_crud.js';

export async function findUser(username){
    try{
        const user = await User.findById(username).exec();
        return [!!user, user];
    } catch(error){
        console.error(error);
        return [false];
    }

}

export async function validatePassword(name, pwd){
    const bool = await findUser(name);
    if(!bool[0]){
        return false;
    }
    if(bool[1].password !== pwd){
        return false;
    }
    return true;
}

export async function addUser(name, pwd){
    const bool = await findUser(name);
    if(bool[0]){
        return false;
    }
    await createUser(name, pwd, 0,0,0,{});
    return true;
}

// console.log(await findUser("san16"));
// console.log(await validatePassword("san16" , "Redmm2001#"));
// console.log(await addUser("john" , "javachip20"));
