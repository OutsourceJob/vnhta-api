import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountRateEntity } from './discount-rate.entity';
import { DiscountRateService } from './discount-rate.service';
import { DiscountRateController } from './discount-rate.controller';

@Module({
   imports: [TypeOrmModule.forFeature([DiscountRateEntity])],
   controllers: [DiscountRateController],
   providers: [DiscountRateService],
   exports: [DiscountRateService],
})
export class DiscountRateModule { }
