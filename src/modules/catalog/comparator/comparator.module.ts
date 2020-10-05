import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComparatorController } from './comparator.controller';
import { ComparatorEntity } from './comparator.entity';
import { ComparatorService } from './comparator.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComparatorEntity])],
  controllers: [ComparatorController],
  providers: [ComparatorService],
  exports: [ComparatorService]
})
export class ComparatorModule { }
