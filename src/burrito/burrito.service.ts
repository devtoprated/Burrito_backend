import { Injectable } from '@nestjs/common';
import { Burrito } from '../entities/burrito.entity';
import { Category } from '../entities/category.entity';


@Injectable()
export class BurritoService {
  constructor(

  ) { }

  async findAll(req, res): Promise<any> {
    try {

      // const burritos = await Burrito.findAll({});

      const burritos = await Burrito.findAll({
        include: [{
          model: Category
        }]
      });

      if (burritos && burritos.length > 0) {
        return res.json({
          status: true,
          message: "All burritos fetched successfuly.",
          result: burritos
        })
      }

      else {
        return res.json({
          status: false,
          message: "No burritos found.",
          result: []
        })
      }

    } catch (error) {
      return res.json({
        status: false,
        message: error.message,
      })
    }

  }
}
