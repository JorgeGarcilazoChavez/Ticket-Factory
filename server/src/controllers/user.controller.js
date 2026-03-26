import { User } from "../models/User.js";

// SELECT Queries
export const findAllUsers = async () =>{
    return await User.findAll();
}

export const findOneUser = async (id) =>{
    return await User.findByPk(id);
}

export const findUserByEmail = async (email) => {
    return await User.findOne({where: {email: email}});
}

// INSERT Queries
export const createUser = async (firstName, lastName, email, password)=> {
    const user = await User.create({firstName: firstName, lastName: lastName, email: email, password: password});
    const { password: _, ...userNoPassword } = user.toJSON(); // shorthand destructuring and removing the password
    return userNoPassword;
};

// DELETE Queries
export const deleteUser = async (id) =>{
    return await User.destroy({
        where: {id}
    })
};