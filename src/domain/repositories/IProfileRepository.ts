import { ProfileData } from '@/src/domain/entities/Profile'

export interface IProfileRepository {

    getProfile(): Promise<ProfileData>

}