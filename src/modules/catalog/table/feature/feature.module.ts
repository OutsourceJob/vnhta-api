import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureEntity } from './feature.entity';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';

@Module({
    imports: [TypeOrmModule.forFeature([FeatureEntity])],
    controllers: [FeatureController],
    providers: [FeatureService],
    exports: [FeatureService]
})
export class FeatureModule { }
