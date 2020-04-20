const mongoose = require('mongoose')
const validator = require('validator')

const url = 'mongodb+srv://puneet:02040204@nodeapi-etlso.mongodb.net/task-manager?retryWrites=true&w=majority'
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})




