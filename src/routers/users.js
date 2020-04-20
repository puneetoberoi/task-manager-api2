const express = require('express')
const userRouter = new express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const validate = require('validator')
const auth = require('../middleware/auth')
const bodyParser = require('body-parser')
userRouter.use(bodyParser.json())

userRouter.post('/',async (req, res)=>{
    const user = new User(req.body)
    
    await user.save()
    
    .then((data)=>{
        const token = user.generateAuthToken()
        //console.log(data.password + ' one')
        res.send({user, token})
    }).catch((err)=>{
        res.status(400).send('Unable to complete request or Email already taken')
    })
    // User.create(req.body)
    // .then((user)=>{
    //     return user
    // })
    // .then((find)=>{
    //     console.log(find.email)
    //     User.updateOne({email: find.email}, {age: 1}, (err, data)=>{
    //         res.json({
    //             "count": data
    //         })    
    //     })
    // })
    // .catch((err)=>{
    //     res.status(400).send(err)
    //     console.log(err)
    // })

})
.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        console.log(user)
        // const userObject = user.toObject()
        // delete userObject.password
        // delete userObject.tokens
        // res.send({userObject, token})
        res.send({ user, token })
    } catch (e) {
        res.status(400).send('Invalid Credentials!')
    }
})
.post('/logout', auth, async(req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token 
        })
        await req.user.save()
        res.send('Logged out successfully!')
    }catch(e) {
        res.status(500).send()
    }
})
.get('/me', auth,  (req, res)=>{
    res.send(req.user)
    // User.find({})
    // .then((user)=>{
    //     res.json(user)
    //     console.log(user)
    // }).catch((err)=>{
    //     res.status(500).send(err)
    //     console.log(err)
    // })
})
// .get('/:email', (req, res)=>{
//     if(!validate.isEmail(req.params.email)){
//         res.send('Please Enter a valid email!')
//     }
//     if(User.find({"email": req.params.email}).count >1  ){
//         return res.send('Please register again!')
//     }else{
//         User.findOne({"email": req.params.email})
//     .then((user)=>{
//         if(!user){
//             return res.status(400).send()
//         }
//         console.log(user)
//         res.send(user)
//     }).catch((err)=>{
//         res.status(500).send(err)
//     })
//     }
// })

// .get('/:id', (req, res)=>{
//     User.findById({_id: req.params.id})
//     .then((user)=>{
//         if(!(user.email)){
//             return res.send('User not found!')
//         }
//         res.send(user)
//     })
//     .catch((err)=>{
//         res.status(404).send('Id not valid')
//     })

// })
.patch('/me', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowed = ['name', 'age', 'email', 'password']
    const isValid = updates.every((update)=>{
        return allowed.includes(update)
    })

    if(!isValid){
        return res.status(400).send('Invalid Updates')
    }

    try{
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    //user will hold the promise comingback from above query
    //new will give the new data
    //const user = await User.findById(req.params.id)

    updates.forEach((update)=>{
        req.user[update] = req.body[update]
    })

    await req.user.save()

    // if(!user){
    //     return res.send('User not found!')
    // }
    res.send(req.user)

    }catch(e){
        res.send(e)
    }
})
// .patch('/:email', async (req, res)=>{
//     const updates = Object.keys(req.body)//Object to array of strings
//     const allowed = ['name', 'email', 'age']

//     const isValid = updates.every((update)=>{
//         return allowed.includes(update)
//     })

//     if(!isValid){
//         return res.status(400).send("invalid operation")
//     }

//     User.findOne({email: req.params.email})
//     .then(async (user)=>{
//         updates.forEach((update)=>{
//             user[update] = req.body[update]
//         })
//         await user.save()
//         if(!user){
//             return res.send('User not found!')
//         }
//         res.send(user)
//     })
//     // .then( (user1)=>{
//     //     // const password = function(user1){
//     //     //     if(user1.isModified('password')){
//     //     //         user1.password =  bcrypt.hash(user.password, 8)
//     //     //         return password
                
//     //     //     }
//     //     // }         
//     //     user1.password = bcrypt.hash(user1.password, 8)
//     //     req.body.password = user1.password
        
//     //     User.updateOne({email: req.params.email}, req.body)
//     //     .then(async(user)=>{
//     //         res.send(user)
            
//     //     })
//     })
        


//     // User.findOneAndUpdate({email: req.params.email}, req.body,{new: true})
//     // .then(async (user)=>{
        
//     //     return user
//     // })
//     // .then(async (user)=>{
//     //     User.findOne({email: req.params.email})
//     //     if(user.isModified('password')){
//     //         user.password = await bcrypt.hash(user.password, 8)
//     //         console.log('password hashed')
            
//     //     }
//     //     await user.save()
//     //     res.send(user)
//     // })
    
//     // User.findOne({_id: req.params.email}, {runValidators: true, new: true})
//     // .then((user)=>{
//     //     console.log(user)
//     //     if(!user){
//     //         return res.send('User Not Found!')
//     //     }
    
//     //     // if(!user){
//     //     //     return res.sendStatus(400).send('user not found!')
//     //     // }
//     //     // console.log(user.countDocuments() + " wmk")
//     //     //return user
//     //     return res.send(user)
//     // })
//     // // .then( (user)=>{
//     // //     User.updateOne(user, req.body, (err, data)=>{
//     // //         console.log(user)
//     // //         return res.send(user + " updated!")
//     // //     })
//     // // })
//     // .catch((err)=>{
//     //     res.sendStatus(400).send()
//     //     console.log(err)
//     // })]]]


module.exports = userRouter