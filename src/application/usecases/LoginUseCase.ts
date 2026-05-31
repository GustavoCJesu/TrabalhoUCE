import { ValidationError } from '@/src/core/errors/AppErrors';
import { IAuthRepository } from "@/src/domain/repositories/IAuthRepository";

export class LoginUseCase {
    constructor(private readonly authRepository: IAuthRepository){}

    async execute(email: string, password: string): Promise<string>{
        const cleanEmail = email.trim().toLowerCase()

        if(cleanEmail.length === 0 || password.length === 0){
            throw new ValidationError('Preencha email e senha')
        }

        if(!cleanEmail.includes('@')){
            throw new ValidationError('Informe um email valido')
        }

        return this.authRepository.login(cleanEmail, password)
    }
}