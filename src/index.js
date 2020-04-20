const express = require('express')
const validate = require('validator')
const path = require('path')
const jwt = require('jsonwebtoken')
const dotenv = require(dotenv)
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const Task = require('./models/task')
require('./db/mongoose')
const auth = require('./middleware/auth')
const utils = require('../utils')
const users = require('./routers/users')
const tasks = require('./routers/tasks')
dotenv.config()
const app = express()
const port = process.env.PORT

//middleware, above app.use we require it to be before 
// app.use((req, res, next)=>{ 
//     if(req.method === 'GET'){
//         res.send('Get requests are disabled!')
//     }else{
//         next()
//     }
// })

app.use(bodyParser.json())
app.use(morgan('dev'))
//app.use(express.json()) bodyparse and this are same

app.use('/users', users)
app.use('/tasks', tasks)
app.use(express.static((__dirname, '../public')))


// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, "../public/" + "index.html" ))
// })




app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`)
})

// const myFunction = async () =>{
//     const token = jwt.sign({_id: 'abc123'}, 'nodecourse', {
//         expiresIn: '10 seconds'
//     } )
//     console.log(token)

//     const data = jwt.verify(token, 'nodecourse')
//     console.log(data)
// }

// myFunction()



// const myFunction = async ()=>{
//     const pass = 'babananak'
//     const hashedPass = await bcrypt.hash(pass, 8)//hash returns a promise
//     //8 serves well between speed and security

//     console.log(pass)
//     console.log(hashedPass)
//     const isMatch = await bcrypt.compare(pass, hashedPass)
//     console.log(isMatch)
    
// }

// myFunction()