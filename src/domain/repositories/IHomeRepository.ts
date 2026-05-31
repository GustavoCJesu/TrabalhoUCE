import { Home } from "@/src/domain/entities/Home";

export interface IHomeRepository{
    getHome(): Promise<Home>
}