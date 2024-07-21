import express from 'express'
import {v4 as uuidv4} from 'uuid'
import bcrypt from 'bcrypt'
import {validadeUserRegistration} from '../middlewares/validations'

const router = express.Router()

export const users = []

router.post('/signup',validadeUserRegistration,async(request, response)=>{
    const {name, email, password}=request.body

    const emailAlreadyRegistred=users.find(user=>user.email===email)
    if(emailAlreadyRegistred){
        return response.status(400).json({message:'Email ja cadastrado, insira outro.'})
    }

    const hasahedPassword = await bcrypt.hash(password, 10)

    const newUser={
        id: uuidv4(),
        name,
        email,
        password: hasahedPassword
    }

    users.push(newUser)

    response.status(201).send(`Seja bem vindo ${newUser.name}! Pessoa usuária registrada com sucesso!`)
})

router.post('/login', async(request, response)=>{
    const {email, password}=request.body


    const user = users.find(user=>user.email===email)

    if(!user){
        return response.status(404).json({message:'Email não encontrado no sistema, verifique ou crie uma conta'})
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
        return response.status(400).json({message:'Insira uma senha válida'})
    }

    return response.status(200).send(`Seja bem vindo ${user.name}! Pessoa usuária logada com sucesso!`)
})

export default router