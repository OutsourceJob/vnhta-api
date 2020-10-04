import { Module } from '@nestjs/common';
import { CostComponentController } from './cost-component.controller';
import { CostComponentService } from './cost-component.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostComponentEntity } from './cost-component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostComponentEntity])],
  controllers: [CostComponentController],
  providers: [CostComponentService],
  exports: [CostComponentService]
})
export class CostComponentModule { }
