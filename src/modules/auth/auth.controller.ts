import { Controller, Post, UseGuards, Request, Get, Body, Query, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { config } from '../../config/index';

@Controller("/auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Request() req: any) {
    return this.authService.generateToken(req.user, config.SECRET_KEY, "1y")
  }

  @Post("/generate-token")
  async generateToken(@Request() req: any) {
    return this.authService.generateToken(null, config.SECRET_KEY, "1h")
  }

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  async getMe(@Request() req) {
    return req.user;
  }

  @Post("/verify")
  async verifyToken(@Headers("Authorization") token: string) {
    return this.authService.verifyToken(token);
  }
}