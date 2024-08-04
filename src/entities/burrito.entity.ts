import { Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { OrderItem } from './order-item.entity';
import { Category } from './category.entity';

@Table
export class Burrito extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;
  
  @Column
  name: string;

  @Column
  image: string;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => Category)
  categories: Category[];
}

