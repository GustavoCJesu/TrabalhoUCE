import { InvalidCredentialsError, NetworkError, UnexpectedError } from '@/src/core/errors/AppErrors';
import { config } from '@/src/core/config/env'





export class AuthRemoteDataSource {
    async login(email: string, password: string): Promise<string> {


        const url = `${config.baseUrl}/auth/login`
        let response: Response

        try {

            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    accessMode: 'APP',
                    appId: config.appId
                }),
            });

        } catch (e) {
            console.error('Falha no fetch de login:', e);
            throw new NetworkError();
        }
        if (response.status === 401) {
            throw new InvalidCredentialsError();
        }
        if (!response.ok) {
            throw new UnexpectedError();
        }

        const dados = await response.json()
        return dados.access_token;

    }
}