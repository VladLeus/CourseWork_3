import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDetailDto {
  @IsArray()
  @IsNotEmpty()
  dto_partsBought: [
    {
      car_part_id: string;
      quantity: number;
    },
  ];

  @IsNumber()
  @IsPositive()
  dto_totalPrice: number;
}
