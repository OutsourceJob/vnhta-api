import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { StudyDesignEntity } from './study-design.entity';

@Injectable()
export class StudyDesignService extends TypeOrmCrudService<StudyDesignEntity> {
  constructor(
    @InjectRepository(StudyDesignEntity)
    repo: Repository<StudyDesignEntity>,
  ) {
    super(repo);
  }
}
