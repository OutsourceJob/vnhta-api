import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { StudyLocationEntity } from './study-location.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class StudyLocationService extends TypeOrmCrudService<StudyLocationEntity>{
  constructor(
    @InjectRepository(StudyLocationEntity) repo: Repository<StudyLocationEntity>,
  ) {
    super(repo);
  }
}