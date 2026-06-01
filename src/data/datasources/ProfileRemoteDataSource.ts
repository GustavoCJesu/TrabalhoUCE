import { config } from "@/src/core/config/env";
import { NetworkError, UnauthorizedError, UnexpectedError } from "@/src/core/errors/AppErrors";
import { ProfileData } from "@/src/domain/entities/Profile";


export class ProfileRemoteDataSource{

    async getProfile(token: string): Promise<ProfileData>{

        const url = `${config.baseUrl}/app/home/profile`

        let response: Response

        try{
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        }catch(e){
            console.error('Falha no fetch do Profile:', e)
            throw new NetworkError()
        }

        if(response.status === 401){
            throw new UnauthorizedError()
        }

        if(!response.ok){
            throw new UnexpectedError()
        }

        const dados = await response.json()
        return dados

    }
    
}