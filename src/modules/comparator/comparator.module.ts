import { Module } from '@nestjs/common';
import { ComparatorController } from './comparator.controller';
import { ComparatorService } from './comparator.service';

@Module({
  controllers: [ComparatorController],
  providers: [ComparatorService]
})
export class ComparatorModule {}
