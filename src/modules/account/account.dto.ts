import { IsEmail, IsNotEmpty, IsEmpty, Validate, Matches } from "class-validator";
import { Gender } from "../../interfaces/index";
import { IsUniqueEmail } from "src/validator/IsUniqueEmail";

export class CreateAccountDTO {
  @IsEmail()
  @IsNotEmpty()
  @Validate(IsUniqueEmail, { message: "This email already exists" })
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

export class UpdateAccountDTO {
  gender: Gender;
  birthday: Date;
  job: string;
  academicRank: string;
  degree: string;
  company: string;
  position: string;

  @IsEmpty()
  email: string;

  @IsEmpty()
  password: string;

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

export class UpdatePasswordDTO {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  @Matches(this.newPassword)
  newPassword2: string
}