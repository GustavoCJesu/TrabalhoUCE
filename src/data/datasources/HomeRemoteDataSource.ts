import { config } from '@/src/core/config/env'
import { NetworkError, UnauthorizedError, UnexpectedError } from '@/src/core/errors/AppErrors'
import { Home } from '@/src/domain/entities/Home'


export class HomeRemoteDataSource {


    async getHome(token: string): Promise<Home> {

        const url = `${config.baseUrl}/app/home`
        let response: Response

        try {

            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

        } catch (e) {
            console.error('Falha no fetch da Home:', e)
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