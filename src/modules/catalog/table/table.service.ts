import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { TableEntity } from './table.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Connection } from 'typeorm';
import { WriteTableDTO, WriteBaseCaseTableDTO } from './table.dto';
import { RowService } from './row/row.service';
import * as _ from "lodash"
import { FeatureService } from './feature/feature.service';
import { PicoType } from '../../../interfaces/index';
import { parameters as parameterData } from "src/data/catalogs"

@Injectable()
export class TableService extends TypeOrmCrudService<TableEntity>{
  constructor(
    @InjectRepository(TableEntity) repo: Repository<TableEntity>,
    @Inject(forwardRef(() => RowService)) private rowService: RowService,
    private connection: Connection,
    private featureService: FeatureService
  ) {
    super(repo);
  }

  async findTablesByIdArray(idArray: Array<number>): Promise<TableEntity[]> {
    return await this.repo.findByIds(idArray)
  }

  async createTable(data: WriteTableDTO) {
    return await this.repo.create(data).save();
  }

  async findTableById(id: number): Promise<TableEntity> {
    return await this.repo.findOne(id);
  }

  async createBaseCaseTable(data: WriteBaseCaseTableDTO) {
    // find
    const cost_effectiveness: any = _.first(
      await this.connection.query(`
      SELECT * FROM cost_effectiveness WHERE id = ${data.costEffectivenessId}
    `)
    )

    // delete old table + rows (cascade)
    if (cost_effectiveness && cost_effectiveness.base_case_table_id)
      await this.repo.delete(cost_effectiveness.base_case_table_id)

    // create new table
    const table = await this.repo.create({
      name: "Base case",
      parameterCodeArray: ["cost", "effectiveness", "icer", "icer_result"]
    }).save()

    // create new row
    // 1. query interventions
    const _interventions = await this.connection.query(`
      SELECT *
      FROM cost_effectiveness_intervention
      WHERE cost_effectiveness_id = ${data.costEffectivenessId}
    `)
    const interventionRows = await this.rowService.createBaseCaseRows(
      _.map(_interventions, intervention => {
        return {
          tableId: table.id,
          picoType: PicoType.Intervention,
          picoId: intervention.intervention_id
        }
      })
    )

    // 2. comparators
    const _comparators = await this.connection.query(`
      SELECT *
      FROM cost_effectiveness_comparator
      WHERE cost_effectiveness_id = ${data.costEffectivenessId}
    `)

    const comparatorRows = await this.rowService.createBaseCaseRows(
      _.map(_comparators, comparator => {
        return {
          tableId: table.id,
          picoType: PicoType.Comparator,
          picoId: comparator.comparator_id
        }
      })
    )

    const allRows = [...interventionRows, ...comparatorRows]

    let allFeatures = []
    for (const row of allRows) {
      const parameters = _.filter(parameterData, parameter => {
        return _.indexOf(table.parameterCodeArray, parameter.code) > -1
      })
      const features = _.map(parameters, parameter => {
        return {
          rowId: row.id,
          parameterId: parameter.id,
        }
      })

      allFeatures = [...allFeatures, ...features]
    }

    await this.featureService.createFeatures(allFeatures)


    await this.connection.query(`
      UPDATE cost_effectiveness
      SET base_case_table_id = ${table.id}
      WHERE id = ${data.costEffectivenessId}
    `)

    return table;
  }
}