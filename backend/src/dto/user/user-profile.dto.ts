import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserProfileDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUUID()
  dto_car_model_id?: string;

  @IsString()
  @IsNotEmpty()
  dto_user_role: string;
}
