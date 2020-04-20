const mongoose = require('mongoose')
const validator = require('validator')


const Task = mongoose.model('task', {
    description: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    completed: {
        type: Boolean,
        default: false
    }

})

// const task = new Task({
//     description: "Mopping       ",
// }).save().then((task)=>{
//     console.log(task)
// }).catch((err)=>{
//     console.log(err)
// })

module.exports = Task