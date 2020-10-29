import { SearchService } from "./search.service"
import { Test } from '@nestjs/testing';

describe("search", () => {
  let searchService: SearchService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SearchService]
    })
      .compile()

    searchService = moduleRef.get<SearchService>(SearchService);

    it("Test Translate Function", async () => {
      // console.log(await searchService.generateWords("Cost"))
      expect(await searchService.generateWords("Cost")).toBe("Chi phí")
    })
  })
})