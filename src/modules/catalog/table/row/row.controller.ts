import { Controller, UseInterceptors, BadRequestException } from '@nestjs/common';
import { Crud, Override, ParsedRequest, CrudRequest, ParsedBody } from '@nestjsx/crud';
import { RowEntity } from './row.entity';
import { RowService } from './row.service';
import { SerializerInterceptor } from '../../../../serialization/serializer.interceptor';
import { WriteRowDTO } from './row.dto';

@Crud({
  model: {
    type: RowEntity
  },
  dto: {
    create: WriteRowDTO,
    update: WriteRowDTO
  }
})
@Controller("/rows")
@UseInterceptors(SerializerInterceptor)
export class RowController {
  constructor(public service: RowService) { }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() data: WriteRowDTO
  ) {
    return this.service.createRow(data)
  }

  @Override()
  getOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    let rowId: number;
    const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")
    if (!fieldId) throw new BadRequestException("Row Id is required")

    if (fieldId) rowId = fieldId.value;

    return this.service.findRowById(rowId)
  }

  @Override()
  getMany(
    @ParsedRequest() req: CrudRequest
  ) {
    const tableId = req.parsed.filter.find(item => item.field === "tableId")
    return this.service.findRowsByArticleId(tableId.value)
  }

  @Override()
  updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() data: any
  ) {
    let rowId: number;
    const fieldId = req.parsed.paramsFilter.find(item => item.field === "id")
    if (!fieldId) throw new BadRequestException("Article Id is required")

    if (fieldId) rowId = fieldId.value;

    return this.service.updateRowById(rowId, data)
  }
}
