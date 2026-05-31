import { IHomeRepository } from "@/src/domain/repositories/IHomeRepository";
import { Home } from "@/src/domain/entities/Home";

export class GetHomeUseCase{
    constructor(private readonly homeRepository: IHomeRepository){}

    async execute(): Promise<Home>{
        return this.homeRepository.getHome()
    }
}