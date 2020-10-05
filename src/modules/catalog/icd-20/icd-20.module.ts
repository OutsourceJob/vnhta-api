import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Icd20Entity } from './icd-20.entity';
import { Icd20Service } from './icd-20.service';
import { Icd20Controller } from './icd-20.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Icd20Entity])],
    controllers: [Icd20Controller],
    providers: [Icd20Service],
    exports: [Icd20Service],
})
export class Icd20Module { }

// nest g s modules/catalog/analysis-method/analysis-method --flat --no-spec
// nest g co modules/catalog/analysis-method/analysis-method --flat --no-spec
// nest g mo modules/catalog/analysis-method/analysis-method --flat --no-spec