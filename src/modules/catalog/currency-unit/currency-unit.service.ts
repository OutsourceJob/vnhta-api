import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CurrencyUnitEntity } from './currency-unit.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyUnitService extends TypeOrmCrudService<CurrencyUnitEntity>{
   constructor(
      @InjectRepository(CurrencyUnitEntity) repo: Repository<CurrencyUnitEntity>,
   ) {
      super(repo);
   }
}