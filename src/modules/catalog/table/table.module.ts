import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
    imports: [TypeOrmModule.forFeature([TableEntity])],
    controllers: [TableController],
    providers: [TableService],
    exports: [TableService]
})
export class TableModule { }
