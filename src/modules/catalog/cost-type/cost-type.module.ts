import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostTypeEntity } from './cost-type.entity';
import { CostTypeController } from './cost-type.controller';
import { CostTypeService } from './cost-type.service';

@Module({
    imports: [TypeOrmModule.forFeature([CostTypeEntity])],
    controllers: [CostTypeController],
    providers: [CostTypeService],
    exports: [CostTypeService]
})
export class CostTypeModule { }
