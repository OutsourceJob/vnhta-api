import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyUnitEntity } from './currency-unit.entity';
import { CurrencyUnitService } from './currency-unit.service';
import { CurrencyUnitController } from './currency-unit.controller';

@Module({
   imports: [TypeOrmModule.forFeature([CurrencyUnitEntity])],
   controllers: [CurrencyUnitController],
   providers: [CurrencyUnitService],
   exports: [CurrencyUnitService],
})
export class CurrencyUnitModule { }
