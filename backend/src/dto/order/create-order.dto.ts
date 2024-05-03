import { IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  dto_user_id: string;

  @IsUUID()
  dto_user_details_id: string;
}