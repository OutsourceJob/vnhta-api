import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RowEntity } from './row.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { WriteRowDTO } from './row.dto';
import { FeatureService } from '../feature/feature.service';
import { ParameterService } from "../parameter/parameter.service";
import * as _ from "lodash";
import { WriteFeatureDTO } from '../feature/feature.dto';

@Injectable()
export class RowService extends TypeOrmCrudService<RowEntity>{
  constructor(
    @InjectRepository(RowEntity) repo: Repository<RowEntity>,
    private featureService: FeatureService,
    private parameterService: ParameterService
  ) {
    super(repo);
  }

  async findRowsByIdArray(idArray: Array<number>): Promise<RowEntity[]> {
    return await this.repo.findByIds(idArray)
  }

  async createRow(data: WriteRowDTO): Promise<RowEntity> {
    const newRow = await this.repo.create(data).save()
    const parameters = await this.parameterService.findParameters()

    const features = _.map(parameters, parameter => {
      return {
        rowId: newRow.id,
        parameterId: parameter.id,
      } as WriteFeatureDTO
    })

    const newFeatures = await this.featureService.createFeatures(features)

    _.assign(newRow, { features: newFeatures })

    return newRow;
  }

  async findRowById(rowId: number) {
    const foundRow = await this.repo.findOne(rowId)
    const features = await this.featureService.findFeaturesByRowId(rowId)
    _.assign(foundRow, { features })
    return foundRow;
  }

  async findRowsByArticleId(tableId: number) {
    const rows = await this.repo.find({ where: { tableId } })
    console.log("RowService -> findRowsByArticleId -> rows", rows)

    const _rows = []
    for (const row of rows) {
      const rowId = row.id;
      const _row = await this.findRowById(rowId)
      _rows.push(_row)
    }

    return _rows;
  }
}