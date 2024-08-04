import { PartialType } from '@nestjs/swagger';
import { CreateBurritoDto } from './create-burrito.dto';

export class UpdateBurritoDto extends PartialType(CreateBurritoDto) {}
