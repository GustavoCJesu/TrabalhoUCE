export interface IAuthRepository {
    login(email: string, password: string): Promise<string>;

    getToken(): Promise<string | null>;

    logout(): Promise<void>;
    
}