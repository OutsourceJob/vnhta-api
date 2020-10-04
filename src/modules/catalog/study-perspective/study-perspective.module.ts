import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyPerspectiveEntity } from './study-perspective.entity';
import { StudyPerspectiveController } from './study-perspective.controller';
import { StudyPerspectiveService } from './study-perspective.service';

@Module({
    imports: [TypeOrmModule.forFeature([StudyPerspectiveEntity])],
    controllers: [StudyPerspectiveController],
    providers: [StudyPerspectiveService],
    exports: [StudyPerspectiveService]
})
export class StudyPerspectiveModule { }
