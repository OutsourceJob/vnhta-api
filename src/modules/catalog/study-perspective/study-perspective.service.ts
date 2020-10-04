import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { StudyPerspectiveEntity } from './study-perspective.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class StudyPerspectiveService extends TypeOrmCrudService<StudyPerspectiveEntity>{
  constructor(
    @InjectRepository(StudyPerspectiveEntity) repo: Repository<StudyPerspectiveEntity>,
  ) {
    super(repo);
  }

  async findStudyPerspectivesByIdArray(authorIdArray: Array<number>): Promise<StudyPerspectiveEntity[]> {
    return await this.repo.findByIds(authorIdArray)
  }
}