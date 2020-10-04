import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionEntity } from './intervention.entity';
import { InterventionService } from './intervention.service';
import { InterventionController } from './intervention.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InterventionEntity])],
  controllers: [InterventionController],
  providers: [InterventionService],
  exports: [InterventionService]
})
export class InterventionModule { }
