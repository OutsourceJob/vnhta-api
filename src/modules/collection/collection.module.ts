import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';

@Module({
    imports: [],
    controllers: [CollectionController],
    providers: [],
})
export class CollectionModule { }
