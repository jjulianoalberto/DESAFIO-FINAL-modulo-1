export function validadeUserRegistration(request, response, next){
    const{name, email,password}=request.body
    if(!name || !email || !password){
        return response.status(400).json({message:'Por favor, verifique se passou o nome, email e ou senha.'})
    }

    next()
}

