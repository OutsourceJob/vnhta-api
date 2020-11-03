import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from "@nestjs/common";
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

    if (!foundAccount.isActive) throw new UnauthorizedException("This account has not been verified yet")

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
    return this.jwtService.verifyAsync(token, { secret: config.SECRET_KEY })
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