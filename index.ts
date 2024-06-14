import {Request, Response} from "express";
import {Log, runDb} from "./repository/db";
import {logsRepository} from "./repository/logsRepository";
import cors from 'cors'

const express = require('express')


const app1 = express()
const port1 = 50000

app1.use(express.static('public1', {index: '1.html'}))

app1.listen(port1, () => {
    console.log(`Listening port ${port1}`)
})


const app2 = express()
app2.use(express.json())
app2.use(cors({
    origin: 'http://localhost:50000',
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
    credentials: false
}))

const port2 = 8888

app2.get('/', (req: Request, res: Response) => {
    res.send('Hello World! 8888')
})

app2.use(express.static('public2', {extensions: ['js']}))

app2.post('/track', (req: Request, res: Response) => {

    logsRepository.createLog(req.body)


})
// app2.listen(port2, () => {
//     console.log(`Listening port ${port2}`)
// })


const startApp2 = async () => {
    await runDb()
    app2.listen(port2, async () => {
        console.log(`Listening port ${port2}`)
    })
}

startApp2()