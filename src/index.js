console.log('Hello, Desafio Final!')
setTimeout(()=>{console.log('Juliano Cesar!')},6000)

const port =  3000

import express from 'express'

const app = express()
app.use(express.json())

app.get('/',(request, response)=>{
    response.status(200).json({message:'Bem vindo à aplicação'})
})

import cors from 'cors'
app.use(cors())

import usersRouter from './routes/users'
import messagesRouter from './routes/messages'

app.use('/users', usersRouter)
app.use('/messages', messagesRouter)


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})


