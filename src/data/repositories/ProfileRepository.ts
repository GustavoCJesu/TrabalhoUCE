import { ProfileData } from "@/src/domain/entities/Profile";
import { ProfileRemoteDataSource } from "../datasources/ProfileRemoteDataSource";
import { IProfileRepository } from "@/src/domain/repositories/IProfileRepository";
import { IAuthRepository } from "@/src/domain/repositories/IAuthRepository";
import { UnauthorizedError } from "@/src/core/errors/AppErrors";


export class ProfileRepository implements IProfileRepository {

    constructor(
        private readonly profileDataSource: ProfileRemoteDataSource,
        private readonly authDRepository: IAuthRepository
    ) { }

    async getProfile(): Promise<ProfileData> {

        const token = await this.authDRepository.getToken()

        if (!token) {
            throw new UnauthorizedError()
        }
        const data = this.profileDataSource.getProfile(token)
        return data
    }
}