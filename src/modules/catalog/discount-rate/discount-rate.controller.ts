import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { DiscountRateEntity } from './discount-rate.entity';
import { DiscountRateService } from './discount-rate.service';
import { WriteDiscountRateDTO } from './discount-rate.dto';
import { SerializerInterceptor } from '../../../serialization/serializer.interceptor';

@Crud({
   model: {
      type: DiscountRateEntity
   },
   dto: {
      create: WriteDiscountRateDTO,
      update: WriteDiscountRateDTO
   }
})
@Controller("discount-rates")
@UseInterceptors(SerializerInterceptor)
export class DiscountRateController {
   constructor(public service: DiscountRateService) { }
}