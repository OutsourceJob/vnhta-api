import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RowEntity } from './row.entity';
import { RowController } from './row.controller';
import { RowService } from './row.service';

@Module({
    imports: [TypeOrmModule.forFeature([RowEntity])],
    controllers: [RowController],
    providers: [RowService],
    exports: [RowService]
})
export class RowModule { }
