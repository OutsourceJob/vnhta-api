import { Module } from '@nestjs/common';
import { StudyDesignController } from './study-design.controller';
import { StudyDesignService } from './study-design.service';

@Module({
  controllers: [StudyDesignController],
  providers: [StudyDesignService]
})
export class StudyDesignModule {}
