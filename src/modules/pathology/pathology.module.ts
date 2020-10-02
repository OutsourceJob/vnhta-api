import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PathologyEntity } from './pathology.entity';
import { PathologyService } from './pathology.service';
import { PathologyController } from './patholoy.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PathologyEntity])],
    controllers: [PathologyController],
    providers: [PathologyService],
    exports: [PathologyService],
})
export class PathologyModule { }
