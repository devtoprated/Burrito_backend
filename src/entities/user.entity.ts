
import { Table, Column, Model, DataType, PrimaryKey, Default, BeforeCreate, HasMany } from 'sequelize-typescript';
import { Order } from './order.entity';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    id: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @HasMany(() => Order)
    orders: Order[];
}
