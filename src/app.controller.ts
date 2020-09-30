import { Controller, Get } from '@nestjs/common';

@Controller("/collections")
export class AppController {

  @Get()
  getHello() {
    return {
      message: "Service is running"
    }
  }
}
