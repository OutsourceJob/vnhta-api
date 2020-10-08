import { Controller, Body, UseInterceptors, BadRequestException, Post, Param } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import * as _ from "lodash";
import { CostEffectivenessService } from './cost-effectiveness.service';
import { WriteCostEffectivenessDTO } from './cost-effectiveness.dto';
import { CostEffectivenessEntity } from './cost-effectiveness.entity';
import { TableService } from '../../catalog/table/table.service';

@UseInterceptors(SerializerInterceptor)
@Crud({
   model: {
      type: CostEffectivenessEntity
   },
   dto: {
      create: WriteCostEffectivenessDTO,
      update: WriteCostEffectivenessDTO
   }
})
@Controller("cost-effectiveness")
export class CostEffectivenessController {
   constructor(
      public service: CostEffectivenessService,
      private tableService: TableService
   ) { }

   @Override()
   createOne(
      @ParsedRequest() req: CrudRequest,
      @ParsedBody() data: WriteCostEffectivenessDTO
   ) {
      return this.service.createCostEffectiveness(data)
   }

   @Override()
   getOne(
      @ParsedRequest() req: CrudRequest,
   ) {
      let costEffectivenessId: number;
      const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")

      if (!fieldId) throw new BadRequestException("CostEffectiveness Id is required")

      if (fieldId) costEffectivenessId = fieldId.value;

      return this.service.getCostEffectivenessById(costEffectivenessId)
   }

   @Override()
   updateOne(
      @ParsedRequest() req: CrudRequest,
      @ParsedBody() data: WriteCostEffectivenessDTO
   ) {
      let costEffectivenessId: number;
      const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")

      if (!fieldId) throw new BadRequestException("CostEffectiveness Id is required")

      if (fieldId) costEffectivenessId = fieldId.value;

      return this.service.updateCostEffectivenessById(costEffectivenessId, data)
   }

   @Post("/:id/generate-base-case-table")
   async generateBaseCaseTable(
      @Param("id") id: number
   ) {
      return this.tableService.createBaseCaseTable({
         costEffectivenessId: id
      })
   }
}
