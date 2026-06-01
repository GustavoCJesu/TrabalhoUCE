export interface ProfileData {
    profile: UserProfile;
    coordinator: Coordinator;
}

interface UserProfile {
    id: number;
    name: string;
    email: string;
    role: string;
    photoUrl: string | null;
}

interface Coordinator {
    id: number;
    name: string;
    email: string;
    photoUrl: string | null;
    primarySpecialty: string
    specialties: Specialty[]
}

interface Specialty {
    id: number;
    name: string;
    isPrimary: boolean
}