import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InterventionService } from 'src/modules/catalog/intervention/intervention.service';
import { StudyLocationService } from 'src/modules/catalog/study-location/study-location.service';
import { Repository } from 'typeorm';
import { WriteQualityOfLifeDTO } from './quality-of-life.dto';
import { QualityOfLifeEntity } from './quality-of-life.entity';

export class QualityOfLifeService extends TypeOrmCrudService<QualityOfLifeEntity> {
  constructor(
    @InjectRepository(QualityOfLifeEntity) repo: Repository<QualityOfLifeEntity>,
    private studyLocationService: StudyLocationService,
    private interventionService: InterventionService
  ) {
    super(repo);
  }

  async createQualityOfLife(data: WriteQualityOfLifeDTO) {
  }
}
