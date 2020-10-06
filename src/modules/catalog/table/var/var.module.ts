import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VarEntity } from './var.entity';
import { VarController } from './var.controller';
import { VarService } from './var.service';

@Module({
    imports: [TypeOrmModule.forFeature([VarEntity])],
    controllers: [VarController],
    providers: [VarService],
    exports: [VarService]
})
export class VarModule { }
