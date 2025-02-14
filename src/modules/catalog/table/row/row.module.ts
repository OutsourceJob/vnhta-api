import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RowEntity } from './row.entity';
import { RowController } from './row.controller';
import { RowService } from './row.service';
import { FeatureModule } from '../feature/feature.module';
import { TableModule } from '../table.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RowEntity]),
        FeatureModule,
        forwardRef(() => TableModule)
    ],
    controllers: [RowController],
    providers: [RowService],
    exports: [RowService]
})
export class RowModule { }
