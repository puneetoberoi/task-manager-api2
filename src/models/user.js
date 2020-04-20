const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true

    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain word password')
            }
        }

    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be positive')
            }
        },
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Emails is invalid')
            }
        },
        
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token=jwt.sign({_id: user._id.toString()}, 'newaccount', {expiresIn: "1 day"})

    user.tokens = user.tokens.concat({token: token})
    await user.save()
    return token
}


//
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    // console.log(password + " " + user.password)
    // console.log(await bcrypt.hash(password,8))
    //console.log(await bcrypt.compare(password, user.password))
    console.log(password)
    console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password)
    //console.log(isMatccoh)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

// const me = new User({
    // name: 'PUNEET       ',
    // password: 'PASSWORD123',
    // age: 28,
    // email: 'puneet@puneet.com'
// }).save().then((user)=>{ //the above instance will return me and we can use it in then
//     console.log(user)
// }).catch((err)=>{
//     console.log(err)
// })


module.exports = User