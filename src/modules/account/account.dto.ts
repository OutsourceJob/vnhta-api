import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAccountDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}