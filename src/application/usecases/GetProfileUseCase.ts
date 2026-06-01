import { ProfileData } from "@/src/domain/entities/Profile";
import { IProfileRepository } from "@/src/domain/repositories/IProfileRepository";

export class GetProfileUseCase{
    constructor(private readonly profileRepository: IProfileRepository){}

    async execute(): Promise<ProfileData>{
        return this.profileRepository.getProfile()
    }
}