import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VarGroupEntity } from './var-group.entity';
import { VarGroupController } from './var-group.controller';
import { VarGroupService } from './var-group.service';

@Module({
    imports: [TypeOrmModule.forFeature([VarGroupEntity])],
    controllers: [VarGroupController],
    providers: [VarGroupService],
    exports: [VarGroupService]
})
export class VarGroupModule { }
