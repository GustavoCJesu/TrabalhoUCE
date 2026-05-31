import { UnauthorizedError } from "@/src/core/errors/AppErrors";
import { Home } from "@/src/domain/entities/Home";
import { IAuthRepository } from "@/src/domain/repositories/IAuthRepository";
import { IHomeRepository } from "@/src/domain/repositories/IHomeRepository";
import { HomeRemoteDataSource } from "../datasources/HomeRemoteDataSource";

export class HomeRepository implements IHomeRepository{
    constructor(
        private readonly homeDataSource: HomeRemoteDataSource,
        private readonly authRepository: IAuthRepository,
    ){}

    async getHome(): Promise<Home>{
        const token = await this.authRepository.getToken()

        if(!token){
            throw new UnauthorizedError()
        }
        const home = this.homeDataSource.getHome(token)
            return home
    }
}