export interface OrderDetailDto {
    dto_partsBought: [
        {
            car_part_id: string;
            quantity: number;
        },
    ];
    dto_totalPrice: number;
}
