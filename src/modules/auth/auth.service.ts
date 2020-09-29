import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from '../user/user.repository';
import * as _ from "lodash"
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { config } from '../../config/index';
import { UserType } from '../../interfaces/index';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtService: JwtService,
  ) { }

  async validateCredentials(email: string, password: string) {
    const foundUser = await this.userRepo.findOne({ email });
    if (!foundUser) throw new NotFoundException("User Not Exist");
    const isMatched = await bcrypt.compare(password, foundUser.password)

    if (!isMatched) return null;

    return foundUser
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
    const secret = decoded.userType === UserType.Admin ? config.ADMIN_SECRET_KEY : config.USER_SECRET_KEY;

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