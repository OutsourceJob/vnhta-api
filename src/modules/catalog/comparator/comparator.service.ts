import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ComparatorEntity } from './comparator.entity';

@Injectable()
export class ComparatorService extends TypeOrmCrudService<ComparatorEntity> {
   constructor(@InjectRepository(ComparatorEntity) repo: Repository<ComparatorEntity>) {
      super(repo);
   }
}
