import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountRepository } from '../account/account.repository';
import * as _ from "lodash"
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { config } from '../../config/index';
import { AccountType } from '../../interfaces/index';
import { AccountService } from '../account/account.service';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService
  ) { }

  async validateCredentials(email: string, password: string) {
    const foundAccount = await this.accountService.getAccountByEmail(email);
    if (!foundAccount) throw new NotFoundException("Account Not Exist");
    const isMatched = await bcrypt.compare(password, foundAccount.password)

    if (!isMatched) return null;

    return foundAccount
  }

  async generateToken(user: any = {}, secret: string, expiresIn: string): Promise<any> {
    const payload = {
      iss: config.SELF_HOST,
      ..._.pick(user, ["id", "email", "userType"]),
    }

    return {
      message: "Login successfully",
      token: this.jwtService.sign(payload, {
        secret,
        expiresIn
      }),
      payload
    }
  }

  async verifyToken(token: string): Promise<any> {
    const decoded: any = this.jwtService.decode(token);
    const secret = decoded.userType === AccountType.Admin ? config.ADMIN_SECRET_KEY : config.USER_SECRET_KEY;

    return this.jwtService.verifyAsync(token, { secret })
      .then(res => {
        return {
          message: "Token is valid",
          isValid: true,
          token,
          payload: res
        }
      })
      .catch(err => {
        throw new BadRequestException("Token is invalid")
      })
  }
}