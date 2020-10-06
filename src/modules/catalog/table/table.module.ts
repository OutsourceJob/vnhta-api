import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { FeatureModule } from './feature/feature.module';
import { ParameterModule } from './parameter/parameter.module';
import { VarModule } from './var/var.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TableEntity]),
        FeatureModule, ParameterModule, VarModule
    ],
    controllers: [TableController],
    providers: [TableService],
    exports: [TableService]
})
export class TableModule { }
