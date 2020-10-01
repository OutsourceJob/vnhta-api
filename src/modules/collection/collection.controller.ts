import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { SerializerInterceptor } from '../../serialization/serializer.interceptor';

@UseInterceptors(SerializerInterceptor)
@Controller("/collections")
export class CollectionController {
  @Get()
  getCollections() {
    return [
      {
        id: 1,
        title: "Chi phí",
        enTitle: "cost",
        slug: "chi-phi",
        enSlug: "cost",
        imageUrl: "https://www.worldatwork.org/workspan/media/Pharmacy_FNL.jpg"
      },
      {
        id: 2,
        title: "Chi phí - Hiệu quả",
        enTitle: "Cost - Effectiveness",
        slug: "chi-phi-hieu-qua",
        enSlug: "cost-effectiveness",
        imageUrl: "https://intelligencepharma.files.wordpress.com/2019/01/cost-benefit-1.jpg"
      },
      {
        id: 3,
        title: "Chất lượng sống",
        enTitle: "Quality of life",
        slug: "chat-luong-song",
        enSlug: "quality-of-life",
        imageUrl: "https://www.thelocalvoice.net/oxford/wp-content/uploads/2019/12/healthy-lifestyle.jpg"
      },
      {
        id: 4,
        title: "Dịch tễ",
        enTitle: "Epidemiology",
        slug: "dich-te",
        enSlug: "epidemiology",
        imageUrl: "https://microbenotes.com/wp-content/uploads/2019/09/Scope-of-Epidemiology.jpg"
      },
    ]
  }
}
