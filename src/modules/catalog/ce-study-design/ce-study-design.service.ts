import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CEStudyDesignEntity } from './ce-study-design.entity';

@Injectable()
export class CEStudyDesignService extends TypeOrmCrudService<CEStudyDesignEntity> {
  constructor(
    @InjectRepository(CEStudyDesignEntity)
    repo: Repository<CEStudyDesignEntity>,
  ) {
    super(repo);
  }
}
