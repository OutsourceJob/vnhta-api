import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { CurrencyUnitEntity } from './currency-unit.entity';
import { CurrencyUnitService } from './currency-unit.service';
import { WriteCurrencyUnitDTO } from './currency-unit.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
   model: {
      type: CurrencyUnitEntity
   },
   dto: {
      create: WriteCurrencyUnitDTO,
      update: WriteCurrencyUnitDTO
   }
})
@Controller("currency-units")
@UseInterceptors(SerializerInterceptor)
export class CurrencyUnitController {
   constructor(public service: CurrencyUnitService) { }
}