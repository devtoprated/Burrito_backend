import { Test, TestingModule } from '@nestjs/testing';
import { BurritoService } from './burrito.service';
import { Burrito } from '../entities/burrito.entity';

describe('BurritoService', () => {
  let service: BurritoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BurritoService],
    }).compile();

    service = module.get<BurritoService>(BurritoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all burritos when they exist in the database', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    const burritos = [{ name: 'Chicken Burrito', size: 'Large', price: 10 }];
    jest.spyOn(Burrito, 'findAll').mockResolvedValue(burritos as any);

    const burritoService = new BurritoService();
    await burritoService.findAll(req, res);

    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: "All burritos fetched successfuly.",
      result: burritos
    });
  });

  it('should not return  burritos when they not exist in the database', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    
    jest.spyOn(Burrito, 'findAll').mockResolvedValue([]);

    const burritoService = new BurritoService();
    await burritoService.findAll(req, res);

    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: "No burritos found.",
      result: []
    });
  });

  it('should handle database connection errors gracefully', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    const errorMessage = 'Database connection error';
    jest.spyOn(Burrito, 'findAll').mockRejectedValue(new Error(errorMessage));

    const burritoService = new BurritoService();
    await burritoService.findAll(req, res);

    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: errorMessage,
    });
  });

});
