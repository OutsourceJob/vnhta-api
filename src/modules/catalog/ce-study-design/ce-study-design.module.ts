import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CEStudyDesignEntity } from './ce-study-design.entity';
import { CEStudyDesignService } from './ce-study-design.service';
import { CEStudyDesignController } from './ce-study-design.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CEStudyDesignEntity])],
  controllers: [CEStudyDesignController],
  providers: [CEStudyDesignService],
  exports: [CEStudyDesignService],
})
export class CEStudyDesignModule { }
