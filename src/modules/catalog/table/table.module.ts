import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { FeatureModule } from './feature/feature.module';
import { ParameterModule } from './parameter/parameter.module';
import { VarModule } from './var/var.module';
import { RowModule } from './row/row.module';
import { VarGroupEntity } from './var-group/var-group.entity';
import { VarGroupModule } from './var-group/var-group.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TableEntity]),
        FeatureModule, ParameterModule, VarModule,
        forwardRef(() => RowModule),
        VarGroupModule,

    ],
    controllers: [TableController],
    providers: [TableService],
    exports: [TableService]
})
export class TableModule { }
