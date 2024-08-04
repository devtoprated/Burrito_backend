import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { OrderItem } from './order-item.entity';
import { Burrito } from './burrito.entity';

@Table
export class Category extends Model {
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

  @Column
  size: string;

  @Column
  price: number;

  @BelongsTo(() => Burrito)
  burritos: Burrito;
}


