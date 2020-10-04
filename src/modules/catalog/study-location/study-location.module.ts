import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyLocationEntity } from './study-location.entity';
import { StudyLocationService } from './study-location.service';
import { StudyLocationController } from './study-location.controller';

@Module({
    imports: [TypeOrmModule.forFeature([StudyLocationEntity])],
    controllers: [StudyLocationController],
    providers: [StudyLocationService],
    exports: [StudyLocationService],
})
export class StudyLocationModule { }
