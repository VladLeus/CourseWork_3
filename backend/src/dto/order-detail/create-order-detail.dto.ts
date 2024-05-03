import { IsDate, IsJSON, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDetailDto {
  @IsJSON()
  @IsNotEmpty()
  dto_partsBought: object[];

  @IsNumber()
  @IsPositive()
  dto_totalPrice: number;

  @IsDate()
  dto_orderDate: Date;
}