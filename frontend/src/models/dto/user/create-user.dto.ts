export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dto_car_model_id: string;
    dto_user_role: 'ADMIN' | 'CLIENT';
}
