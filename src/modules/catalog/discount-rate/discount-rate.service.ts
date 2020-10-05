import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DiscountRateEntity } from './discount-rate.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class DiscountRateService extends TypeOrmCrudService<DiscountRateEntity>{
   constructor(
      @InjectRepository(DiscountRateEntity) repo: Repository<DiscountRateEntity>,
   ) {
      super(repo);
   }
}