import { IsEmail, IsNotEmpty, IsEmpty } from "class-validator";
import { Gender } from "../../interfaces/index";

export class CreateAccountDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  job: string;

  @IsNotEmpty()
  academicRank: string;

  @IsNotEmpty()
  degree: string;

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  position: string;

  @IsEmpty()
  pin: string;
}

export class WriteAccountDTO {
  email: string;
  password: string;
  gender: Gender;
  birthday: Date;
  job: string;
  academic_rank: string;
  degree: string;
  company: string;
  position: string;
}

export class VerifyRegisterEmailDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  pin: string;
}

export class SendPinDTO {
  @IsNotEmpty()
  email: string;
}