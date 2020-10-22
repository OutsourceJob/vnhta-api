import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './modules/statistics/statistics.service';

@Controller("/")
export class AppController {
  constructor(public service: StatisticsService) { }


  @Get()
  async getHello() {
    const articleIdArray = [1, 2, 3, 4, 5, 6];

    const test = await this.service.getDataCollectingMethodStatistics(articleIdArray);

    console.log("test", test);

    return {
      message: "Service is running"
    }
  }
}
