import { Console, Command } from "nestjs-console";
import { CollectionService } from './collection.service';
import { CollectionStatus } from "src/interfaces";

@Console()
export class CollectionConsole {
  constructor(
    private collectionService: CollectionService
  ) { }

  @Command({
    command: "create-sample-collections-staging"
  })
  async createSampleCollectionsStaging() {
    await this.collectionService.createCollection({
      title: "Báo cáo",
      enTitle: "Report Projects",
      code: "RP",
      imageUrls: {
        onClickWhiteUrl: "https://black-mamba.s3-ap-northeast-1.amazonaws.com/images/1599921283153-project+reports+on+click_white+BG.png",
        onClickDarkUrl: "https://black-mamba.s3-ap-northeast-1.amazonaws.com/images/1599921272510-project+reports+on+click_dark+BG.png",
        notOnClickWhiteUrl: "https://black-mamba.s3-ap-northeast-1.amazonaws.com/images/1599994116049-project+reports+not+on+click_white+BG.png",
        notOnClickDarkUrl: "https://black-mamba.s3-ap-northeast-1.amazonaws.com/images/1599994101674-project+reports+not+on+click_dark+BG.png"
      },
      status: CollectionStatus.Published,
      description: ""
    })

    await this.collectionService.createCollection({
      title: "Phân tích",
      enTitle: "Analysis",
      code: "AL",
      imageUrls: {
        onClickWhiteUrl: "https://black-mamba.s3-ap-northeast-1.amazonaws.com/images/1599921253529-Analysis+on+click_white+BG.png",
        onClickDarkUrl: "https://black-mamba.s3-ap-northeast-1.amazonaws.com/images/1599921239491-Analysis+on+click_dark+BG.png",
        notOnClickWhiteUrl: "https://black-mamba.s3-ap-northeast-1.amazonaws.com/images/1599994063100-Analysis+not+on+click_white+BG.png",
        notOnClickDarkUrl: "https://black-mamba.s3-ap-northeast-1.amazonaws.com/images/1599994086321-Analysis+not+on+click_dark+BG.png"
      },
      status: CollectionStatus.Published,
      description: ""
    })
  }

  @Command({
    command: "create-sample-collections-production"
  })
  async createSampleCollectionsProduction() {
    await this.collectionService.createCollection({
      title: "Báo cáo",
      enTitle: "Report Projects",
      code: "RP",
      imageUrls: {
        onClickWhiteUrl: "https://black-mamba-prod.s3-ap-northeast-1.amazonaws.com/images/1600658104219-project+reports+on+click_white+BG.png",
        onClickDarkUrl: "https://black-mamba-prod.s3-ap-northeast-1.amazonaws.com/images/1600658094482-project+reports+on+click_dark+BG.png",
        notOnClickWhiteUrl: "https://black-mamba-prod.s3-ap-northeast-1.amazonaws.com/images/1600658087272-project+reports+not+on+click_white+BG.png",
        notOnClickDarkUrl: "https://black-mamba-prod.s3-ap-northeast-1.amazonaws.com/images/1600658079396-project+reports+not+on+click_dark+BG.png"
      },
      status: CollectionStatus.Published,
      description: ""
    })

    await this.collectionService.createCollection({
      title: "Phân tích",
      enTitle: "Analysis",
      code: "AL",
      imageUrls: {
        onClickWhiteUrl: "https://black-mamba-prod.s3-ap-northeast-1.amazonaws.com/images/1600658070072-Analysis+on+click_white+BG.png",
        onClickDarkUrl: "https://black-mamba-prod.s3-ap-northeast-1.amazonaws.com/images/1600658060041-Analysis+on+click_dark+BG.png",
        notOnClickWhiteUrl: "https://black-mamba-prod.s3-ap-northeast-1.amazonaws.com/images/1600658053517-Analysis+not+on+click_white+BG.png",
        notOnClickDarkUrl: "https://black-mamba-prod.s3-ap-northeast-1.amazonaws.com/images/1600658042410-Analysis+not+on+click_dark+BG.png"
      },
      status: CollectionStatus.Published,
      description: ""
    })
  }
}