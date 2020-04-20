const express = require('express')
const taskRouter = new express.Router()
const Task = require('../models/task')
const bodyParser = require('body-parser')
taskRouter.use(bodyParser.json())


taskRouter.post('/', (req, res)=>{
    const task = new Task(req.body)
    task.save()
    .then((task)=>{
        res.json({
            "task created": req.body
        })
    }).catch((err)=>{
        res.status(400).send(err)
        console.log(err)
    })
})
.get('/', (req, res)=>{
    Task.find()
    .then((task)=>{
        res.json({
            "task created": task
        })
    }).catch((err)=>{
        res.status(400).send(err)
        console.log(err)
    })
})
.get('/:description', (req, res)=>{
    Task.findOne({"description": req.params.description})
    .then((task)=>{
        console.log(task.description.localeCompare(req.params.description))
        if(task.description.localeCompare(req.params.description    )){
            res.status(400).send('No task found!')
        }else{
            res.send(task)
        }
        
    }).catch((err)=>{
        res.status(500).send()
    })
})


module.exports = taskRouter