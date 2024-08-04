import { Column, Model, Table, HasMany, PrimaryKey, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { OrderItem } from './order-item.entity';
import { User } from './user.entity';

@Table
export class Order extends Model {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column
  totalCost: number;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @BelongsTo(() => User)
  user: User;
}
