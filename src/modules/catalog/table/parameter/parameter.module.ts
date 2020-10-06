import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterEntity } from './parameter.entity';
import { ParameterController } from './parameter.controller';
import { ParameterService } from './parameter.service';

@Module({
    imports: [TypeOrmModule.forFeature([ParameterEntity])],
    controllers: [ParameterController],
    providers: [ParameterService],
    exports: [ParameterService]
})
export class ParameterModule { }
