import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyDesignEntity } from './study-design.entity';
import { StudyDesignService } from './study-design.service';
import { StudyDesignController } from './study-design.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudyDesignEntity])],
  controllers: [StudyDesignController],
  providers: [StudyDesignService],
  exports: [StudyDesignService],
})
export class StudyDesignModule {}
