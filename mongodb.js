const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const url = 'mongodb+srv://puneet:02040204@nodeapi-etlso.mongodb.net/test?retryWrites=true&w=majority'
const databaseName = 'task-manager'

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client)=>{
    if(err){
        return console.log('Unable to connecte')
    }
    console.log('Connected to server!')
    const db = client.db(databaseName);

    // db.collection('users').insertOne({"name": "yogesh", "age": 28}, (err, user)=>{
    //     if(err){
    //         return console.log('Cannot add user!')
    //     }
    //     console.log(user.ops)
    //     console.log(user.result)
    //     console.log(user.insertedCount)
    // })

    // db.collection('users').insertMany([{
    //     "name": "nav", "age": 26
    // }, {
    //     "name": "wmk", "age": 1
    // }], (err, users)=>{
    //     console.log('new one\n')
    //     console.log(users.ops)
    //     console.log(users.result)
    //     console.log(users.insertedCount)
    // })

    // db.collection('tasks').insertMany([{
    //     "description": "Paath for evening", "completed": false
    // }, {
    //     "description": "Patience", "completed": false
    // }], (err, tasks)=>{
    //     console.log('new one\n')
    //     console.log(tasks.ops)
    //     console.log(tasks.insertedCount)
    // })

    // db.collection('tasks').findOne({completed: true}, (err, tasks)=>{
    //     console.log(tasks)
    // })
   
    // db.collection('tasks').find().toArray((err, task)=>{
    //     console.log(task)
    // })
    // db.collection('tasks').find().count((err, count)=>{
    //     console.log(count)
    // })
    // db.collection('users').updateOne({"name": "puneet"}, {$inc:{
    //     "age": +1//(-1)
    // } })
    // .then((result)=>{
    //     console.log(result.modifiedCount)//1 if a doc was modified
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // db.collection('tasks').updateMany({"completed": false}, {
    //     $set: {
    //         "completed": true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((err)=>{
    //     console.log(err)
    // })

    // db.collection('tasks').deleteOne({"completed": false})
    // .then((result)=>{
    //     console.log(result.deletedCount)
    // })

    // db.collection('tasks').deleteMany({"completed": true})
    // .then((res)=>{
    //     console.log(res.deletedCount)
    // })

})