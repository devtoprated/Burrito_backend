import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { BurritoService } from '../burrito/burrito.service';
import { Burrito } from '../entities/burrito.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class OrderService {
  constructor(
  ) { }

  async getAllOrders(req,res): Promise<any> {
    try {
      const orders = await Order.findAll({
        where:{
           userId:req.user.payload.id
        },
        include: [
          {
            model: OrderItem,
            required: true,
            include: [
              {
                model: Burrito,
                required: true,
              },
            ],
          },
        ],
      });
  
      if (orders && orders.length > 0) {
        return res.json({
          status: true,
          message: "All orders fetched successfully",
          result: orders,
        });
      } else {
        return res.json({
          status: false,
          message: "No orders found",
          result: [],
        });
      }
    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
      });
    }
  }

  async getOneOrders(id: string,req, res): Promise<Order> {
    try {

      const order = await Order.findOne({
        where: { id, userId:req.user.payload.id },
        include: [
          {
            model: OrderItem,
            required:true,
            include: [{
              model: Burrito,
              required:true,
            }]
          }
        ],
      });

      if (order) {
        return res.json({
          status: true,
          message: "Order fetched successfuly",
          result: order
        })

      }

      else {
        return res.json({
          status: false,
          message: "No order found",
          result: null
        })
      }


    } catch (error) {


      return res.json({
        status: false,
        message: error.message

      })

    }
  }

  async createOrder(orderItems, req, res) {
    try {
      const burritoIds = orderItems?.map(item => item.id); 
      const burritos = await Burrito.findAll({
        where: { id: burritoIds },
        include: [{
          model: Category
        }]
      });
  
  
      const burritoPriceMap = new Map();
      burritos.forEach(burrito => {
        burrito.categories.forEach(category => {
          burritoPriceMap.set(burrito.id, category.price);
        });
      });
  
 
      const totalCost = orderItems.reduce((total, item) => {
        const burritoPrice = burritoPriceMap.get(item.id);
        if (!burritoPrice) {
          throw new Error(`Burrito with ID ${item.id} not found`);
        }
        return total + (burritoPrice * item.quantity);
      }, 0);
  
    
      const order = await Order.create({
        userId: req.user.payload.id,
        totalCost: totalCost
      });
  
    
      const items = await Promise.all(
        orderItems.map(async item => {
          return OrderItem.create({
            burritoId: item.id,
            orderId: order.id,
            quantity: item.quantity,
            options: item.options || null
          });
        })
      );
  
     
      await order.$set('orderItems', items);
  
      return res.json({
        status: true,
        message: "Order submitted successfully",
        result: order
      });
    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
      });
    }
  }
  
  
}
