import { Module } from "@nestjs/common";
import { IsUniqueEmail } from "./IsUniqueEmail";

@Module({
  imports: [],
  providers: [IsUniqueEmail]
})
export class ValidatorModule { }