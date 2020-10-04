import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CostBenefitEntity } from './cost-benefit.entity';

@Injectable()
export class CostBenefitService extends TypeOrmCrudService<CostBenefitEntity>{
}