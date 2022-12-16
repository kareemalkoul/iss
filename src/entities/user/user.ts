export interface UserEntity {
    id: number
    user_name: string;
    phone: string;
    password: string;
    checkPassword(password: string): boolean
}