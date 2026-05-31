import { IAuthRepository } from "@/src/domain/repositories/IAuthRepository";
import { jwtDecode } from "jwt-decode";

export class CheckAuthUseCase{
    constructor(private readonly authRepository: IAuthRepository){}

    async execute(): Promise<boolean>{
        const token = await this.authRepository.getToken()

        if(!token){
            return false
        }

        const payload = jwtDecode(token)
        const agora = Math.floor(Date.now() / 1000)

        if(payload.exp && payload.exp < agora){
            return false
        }

        return true
    }
}