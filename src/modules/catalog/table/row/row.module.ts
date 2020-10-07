import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RowEntity } from './row.entity';
import { RowController } from './row.controller';
import { RowService } from './row.service';
import { FeatureModule } from '../feature/feature.module';
import { ParameterModule } from '../parameter/parameter.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RowEntity]),
        FeatureModule, ParameterModule
    ],
    controllers: [RowController],
    providers: [RowService],
    exports: [RowService]
})
export class RowModule { }
