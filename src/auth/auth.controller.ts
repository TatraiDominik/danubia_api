import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { adminName: string; password: string }) {
    const { adminName, password } = body;
    return this.authService.login(adminName, password);
  }
}
