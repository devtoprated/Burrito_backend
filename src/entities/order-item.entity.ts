import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Burrito } from './burrito.entity';
import { Order } from './order.entity';



// export enum Ingredient {
//   BLACK_OLIVES = 'BLACK_OLIVES',
//   RICE = 'RICE',
//   SOUR_CREAM = 'SOUR_CREAM',
// }


@Table
export class OrderItem extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Burrito)
  @Column({
    type: DataType.UUID,
  })
  burritoId: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    defaultValue: "",
  })
  orderId: string;

  @Column
  quantity: number;

  @Column({
    // type: DataType.ENUM,
    // values: Object.values(Ingredient),
    allowNull: true,
  })
  // options: Ingredient
  options:string

  @BelongsTo(() => Burrito)
  burrito: Burrito;

  @BelongsTo(() => Order)
  order: Order;
}
