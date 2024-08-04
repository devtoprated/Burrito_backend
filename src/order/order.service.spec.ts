import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Order } from '../entities/order.entity';
import { Burrito } from '../entities/burrito.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Category } from '../entities/category.entity';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle database connection errors gracefully', async () => {
    const res = {
      json: jest.fn()
    };

    const req ={
      user:{
        payload:{
          id:1
        }
      }
    }
    const errorMessage = 'Database connection error';
    jest.spyOn(Order, 'findAll').mockRejectedValue(new Error(errorMessage));

    const orderService = new OrderService();
    await orderService.getAllOrders(req,res);

    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: errorMessage,
    });
  });

  describe('getAllOrders',()=>{
    it('should return all orders when orders exist', async () => {
      const mockOrders = [
        {
          id: 1,
          totalCost: 20,
          orderItems: [
            {
              id: 1,
              burritoId: 1,
              orderId: 1,
              quantity: 2,
              burrito: { id: 1, name: 'Chicken Burrito', size: 'Large', price: 10 }
            }
          ]
        }
      ];

      const req ={
        user:{
          payload:{
            id:1
          }
        }
      }
  
      jest.spyOn(Order, 'findAll').mockResolvedValue(mockOrders as any);
  
      const res = {
        json: jest.fn()
      };
  
      const orderService = new OrderService();
      await orderService.getAllOrders(req,res);
  
      expect(res.json).toHaveBeenCalledWith({
        status: true,
        message: "All orders fetched successfully",
        result: mockOrders
      });
    });
  
    it('should not return orders when does not exist', async () => {
  
      jest.spyOn(Order, 'findAll').mockResolvedValue([]);
  
      const res = {
        json: jest.fn()
      };
      const req ={
        user:{
          payload:{
            id:1
          }
        }
      }
  
      const orderService = new OrderService();
      await orderService.getAllOrders(req,res);
  
      expect(res.json).toHaveBeenCalledWith({
        status: false,
        message: "No orders found",
        result: []
      });
    });
  
    it('should handle database connection errors gracefully', async () => {
      const res = {
        json: jest.fn()
      };

      const req ={
        user:{
          payload:{
            id:1
          }
        }
      }

      const errorMessage = 'Database connection error';
      jest.spyOn(Order, 'findAll').mockRejectedValue(new Error(errorMessage));
  
      const orderService = new OrderService();
      await orderService.getAllOrders(req, res);
  
      expect(res.json).toHaveBeenCalledWith({
        status: false,
        message: errorMessage,
      });
    });

  })

  describe('getOneOrders',()=>{

    it('should return order details when order is found', async () => {
      const mockOrder = {
        id: 1,
        totalCost: 20,
        orderItems: [
          {
            burritoId: 1,
            orderId: 1,
            quantity: 2,
            burrito: {
              name: 'Chicken Burrito',
              size: 'Large',
              price: 10
            }
          }
        ]
      };

      jest.spyOn(Order, 'findOne').mockResolvedValue(mockOrder as any);

      const res = {
        json: jest.fn()
      };

      const req ={
        user:{
          payload:{
            id:1
          }
        }
      }

      const orderService = new OrderService();
      await orderService.getOneOrders("1", req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: true,
        message: "Order fetched successfuly",
        result: mockOrder
      });
    });

    it('should not return order details when order is not found', async () => {


      jest.spyOn(Order, 'findOne').mockResolvedValue(null);

      const res = {
        json: jest.fn()
      };

      const req ={
        user:{
          payload:{
            id:1
          }
        }
      }

      const mockOrderInstance = {
        $set: jest.fn().mockResolvedValue(undefined), 
      };

      const orderService = new OrderService();
      await orderService.getOneOrders("1",req, res);

      expect(res.json).toHaveBeenCalledWith({
        status: false,
        message: "No order found",
        result: null
      });
    });

  })

  it('should create an order with valid order items', async () => {
    const mockReq = { user: { payload: { id: 'user-id' } } };
    const mockRes = { json: jest.fn() };
    const mockOrderItems = [
      { id: 'burrito-id-1', quantity: 2, options: 'option1' },
      { id: 'burrito-id-2', quantity: 1, options: 'option2' }
    ];

    const mockBurritos = [
      { id: 'burrito-id-1', categories: [{ price: 10 }] },
      { id: 'burrito-id-2', categories: [{ price: 15 }] }
    ];

    jest.spyOn(Burrito, 'findAll').mockResolvedValue(mockBurritos as any);
    jest.spyOn(Order, 'create').mockResolvedValue({ id: 'order-id', $set: jest.fn() });
    jest.spyOn(OrderItem, 'create').mockImplementation(item => Promise.resolve(item));

    const orderService = new OrderService();
    await orderService.createOrder(mockOrderItems, mockReq, mockRes);

    expect(Burrito.findAll).toHaveBeenCalledWith({
      where: { id: ['burrito-id-1', 'burrito-id-2'] },
      include: [{ model: Category }]
    });
    expect(Order.create).toHaveBeenCalledWith({
      userId: 'user-id',
      totalCost: 35
    });
    expect(mockRes.json).toHaveBeenCalledWith({
      status: true,
      message: "Order submitted successfully",
      result: expect.any(Object)
    });
  });


});
