import { Controller, Body, UseInterceptors, BadRequestException } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";
import { QualityOfLifeEntity } from './quality-of-life.entity';
import { WriteQualityOfLifeDTO } from './quality-of-life.dto';
import { QualityOfLifeService } from './quality-of-life.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import * as _ from "lodash";

@UseInterceptors(SerializerInterceptor)
@Crud({
   model: {
      type: QualityOfLifeEntity
   },
   dto: {
      create: WriteQualityOfLifeDTO,
      update: WriteQualityOfLifeDTO
   }
})
@Controller("/quality-of-lives")
export class QualityOfLifeController {
   constructor(
      public service: QualityOfLifeService
   ) { }

   @Override()
   createOne(
      @ParsedRequest() req: CrudRequest,
      @ParsedBody() data: WriteQualityOfLifeDTO
   ) {
      return this.service.createQualityOfLife(data)
   }

   @Override()
   getOne(
      @ParsedRequest() req: CrudRequest,
   ) {
      let costBenefitId: number;
      const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")
      if (!fieldId) throw new BadRequestException("QualityOfLife Id is required")

      if (fieldId) costBenefitId = fieldId.value;

      return this.service.getQualityOfLifeById(costBenefitId)
   }

   @Override()
   updateOne(
      @ParsedRequest() req: CrudRequest,
      @ParsedBody() data: WriteQualityOfLifeDTO
   ) {
      let costBenefitId: number;
      const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")
      if (!fieldId) throw new BadRequestException("QualityOfLife Id is required")

      if (fieldId) costBenefitId = fieldId.value;

      return this.service.updateQualityOfLifeById(costBenefitId, data)
   }
}
