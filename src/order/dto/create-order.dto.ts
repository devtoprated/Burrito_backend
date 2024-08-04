import { ApiProperty } from "@nestjs/swagger";

class OrderItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  size: string;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItem] })
  items: OrderItem[];
}
