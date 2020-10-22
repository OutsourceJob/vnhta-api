import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InterventionService } from 'src/modules/catalog/intervention/intervention.service';
import { StudyLocationService } from 'src/modules/catalog/study-location/study-location.service';
import { Repository, Connection } from 'typeorm';
import * as _ from "lodash";
import { WriteQualityOfLifeDTO } from './quality-of-life.dto';
import { QualityOfLifeEntity } from './quality-of-life.entity';
import { Icd20Service } from '../../catalog/icd-20/icd-20.service';
import { NotFoundException, Injectable } from '@nestjs/common';

@Injectable()
export class QualityOfLifeService extends TypeOrmCrudService<QualityOfLifeEntity> {
  constructor(
    @InjectRepository(QualityOfLifeEntity) repo: Repository<QualityOfLifeEntity>,
    private studyLocationService: StudyLocationService,
    private interventionService: InterventionService,
    private icd20Service: Icd20Service,
    private connection: Connection,
  ) {
    super(repo);
  }

  async createQualityOfLife(data: WriteQualityOfLifeDTO) {
    const interventionIdArray = _.get(data, "interventionIdArray", []);
    const studyLocationIdArray = _.get(data, "studyLocationIdArray", []);
    const icd20IdArray = _.get(data, "icd20IdArray", []);

    const interventions = await this.interventionService.findInterventionByIdArray(interventionIdArray);
    const studyLocations = await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray);
    const icd20s = await this.icd20Service.findIcd20ByIdArray(icd20IdArray);

    const newQualityOfLife = await this.repo
      .create({
        articleId: data.articleId,
        interventions,
        icd20s,
        studyLocations
      })
      .save()

    return await this.getQualityOfLifeById(newQualityOfLife.id);
  }

  async updateQualityOfLifeById(qualityOfLifeId: number, data: WriteQualityOfLifeDTO) {
    const qualityOfLife = await this.repo.findOne(qualityOfLifeId);

    if (!qualityOfLife) throw new NotFoundException("Quality Of Life Not Found");

    const interventionIdArray = _.get(data, "interventionIdArray");
    const studyLocationIdArray = _.get(data, "studyLocationIdArray");
    const icd20IdArray = _.get(data, "icd20IdArray");

    const interventions = data.interventionIdArray && await this.interventionService.findInterventionByIdArray(interventionIdArray)
    const studyLocations = data.studyLocationIdArray && await this.studyLocationService.findStudyLocationByIdArray(studyLocationIdArray)
    const icd20s = data.icd20IdArray && await this.icd20Service.findIcd20ByIdArray(icd20IdArray)

    _.assign(data, { interventions, studyLocations, icd20s });

    _.chain(data)
      .omit(["interventionIdArray", "studyLocationIdArray"])
      .keys()
      .value()
      .forEach(key => {
        qualityOfLife[key] = data[key];
      })

    await qualityOfLife.save();

    return await this.getQualityOfLifeById(qualityOfLifeId);
  }

  async getQualityOfLifeById(qualityOfLifeId: number) {
    let qualityOfLife = await this.connection
      .getRepository(QualityOfLifeEntity)
      .createQueryBuilder("quality_of_life")
      .leftJoinAndSelect("quality_of_life.interventions", "intervention")
      .leftJoinAndSelect("quality_of_life.studyLocations", "study_location")
      .leftJoinAndSelect("quality_of_life.icd20s", "icd_20")
      .where("quality_of_life.id = :id", { id: qualityOfLifeId })
      .getOne()

    if (!qualityOfLife) throw new NotFoundException("Quality of life Not Found");

    _.assign(qualityOfLife, {
      interventionIdArray: _.map(qualityOfLife.interventions, "id"),
      studyLocationIdArray: _.map(qualityOfLife.studyLocations, "id"),
      icd20IdArray: _.map(qualityOfLife.icd20s, "id"),
      interventions: undefined,
      studyLocations: undefined,
      icd20s: undefined
    })

    return qualityOfLife;
  }
}
