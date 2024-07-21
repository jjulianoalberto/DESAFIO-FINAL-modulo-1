import express from 'express'
import {v4 as uuidv4} from 'uuid'
import {users} from './users'

const router = express.Router()

export const messages = []

router.post('/message',(request, response) => {
    const {title, description, userEmail} = request.body


const user = users.find(user => user.email === userEmail)

if(!user){
    return response.status(400).json({
        message:'Email não encontrado, verifique ou crie uma conta'
    })
    
}

const newMessage={
    id: uuidv4(),
    title,
    description,
    userEmail
    }

messages.push(newMessage)

response.status(201).json({message: 'Mensagem criada com sucesso!', newMessage})
})


router.get('/message/:email', (request, response)=>{
    const {email} = request.params

    const user = users.find(user => user.email === email)
    if(!user){
        return response.status(404).json({message:'Email não encontrado, verifique ou crie uma conta'})
    }

    const userMessages = messages.filter(message => message.userEmail === email)
    response.status(200).json({message:'Seja bem-vindo!',  messages: userMessages})
    
})

router.put('/message/:id',(request, response)=>{
    //entrada
    const {id}=request.params
    const {title,description}=request.body
//processamento
    const message=messages.find(message=>message.id===id)
    if(!message){
        return response.status(404).json({message: 'Por favor, informe um id válido da mensagem'})
    }

    message.title=title
    message.description=description
//saida
    response.status(200).json({message:'Mensagem atualizada com sucesso !', updateMessage: message})

})

router.delete('/message/:id',(request,response)=>{
    const {id}=request.params

    const messageIndex=messages.findIndex(message=>message.id===id)
    if(messageIndex === -1){
        return response.status(404).json({message:'Mensagem não encontrada, verifique o identificador em nosso banco'})
    }

    const deletedMessage=messages.splice(messageIndex,1)[0]

    response.status(200).json({message:'Mensagem apagada com sucesso', deletedMessage})
})

export default router