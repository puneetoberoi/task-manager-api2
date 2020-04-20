require('./src/db/mongoose')
const User = require('./src/models/user')

const createAndUpdateUser = async(name, password, age, email) =>{
    // const userCreated = await User.create({
    //     name: name,
    //     password: password,
    //     age: age,
    //     email: email
    // })
    const userUpdated = await User.updateOne({email}, {"age": 21})

    return userUpdated
}

module.exports = {
    createAndUpdateUser,
}