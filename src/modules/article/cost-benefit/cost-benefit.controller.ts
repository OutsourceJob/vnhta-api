import { Controller, Body, UseInterceptors, BadRequestException } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from "@nestjsx/crud";
import { CostBenefitEntity } from './cost-benefit.entity';
import { WriteCostBenefitDTO } from './cost-benefit.dto';
import { CostBenefitService } from './cost-benefit.service';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';
import * as _ from "lodash";

@UseInterceptors(SerializerInterceptor)
@Crud({
  model: {
    type: CostBenefitEntity
  },
  dto: {
    create: WriteCostBenefitDTO,
    update: WriteCostBenefitDTO
  }
})
@Controller("/cost-benefits")
export class CostBenefitController {
  constructor(
    public service: CostBenefitService
  ) { }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() data: WriteCostBenefitDTO
  ) {
    return this.service.createCostBenefit(data)
  }

  // @Override()
  // getOne(
  //   @ParsedRequest() req: CrudRequest,
  // ) {
  //   let costBenefitId: number;
  //   const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")
  //   if (!fieldId) throw new BadRequestException("CostBenefit Id is required")

  //   if (fieldId) costBenefitId = fieldId.value;

  //   return this.service.getCostBenefitById(costBenefitId)
  // }

  // @Override()
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() data: WriteCostBenefitDTO
  ) {
    let costBenefitId: number;
    const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")
    if (!fieldId) throw new BadRequestException("CostBenefit Id is required")

    if (fieldId) costBenefitId = fieldId.value;

    return this.service.updateCostBenefitById(costBenefitId, data)
  }
}
