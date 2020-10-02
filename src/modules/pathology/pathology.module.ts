import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PathologyEntity } from './pathology.entity';
import { PathologyService } from './pathology.service';

@Module({
    imports: [TypeOrmModule.forFeature([PathologyEntity])],
    controllers: [],
    providers: [PathologyService],
    exports: [PathologyService],
})
export class PathologyModule { }
