import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InterventionService } from 'src/modules/catalog/intervention/intervention.service';
import { StudyLocationService } from 'src/modules/catalog/study-location/study-location.service';
import { Repository } from 'typeorm';
import _ from "lodash";
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

  async createQualityOfLife(data: WriteQualityOfLifeDTO): Promise<QualityOfLifeEntity> {
    const interventionIdArray = _.get(data, "interventionIdArray", []);
    const studyLocationIdArray = _.get(data, "studyLocationIdArray", []);

    const interventions = await this.interventionService.findInterventionByIdArray(interventionIdArray);
    const studyLocations = await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray);

    const newQualityOfLife = await this.repo
      .create({
        articleId: data.articleId,
        interventions,
        studyLocations
      })
      .save()

    return newQualityOfLife;
  }
}
