import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUUID()
  dto_car_model_id: string;

  @IsEnum(['ADMIN', 'CLIENT'], {
    message: 'Valid role required',
  })
  @IsNotEmpty()
  dto_user_role: 'ADMIN' | 'CLIENT';
}
