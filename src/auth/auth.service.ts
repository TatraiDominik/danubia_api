import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AdminService } from 'src/admin/admin.service';
import { ConfigService } from '@nestjs/config';
import { JwtData } from 'src/types/JwtData';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(adminName: string, password: string): Promise<{ jwt: string }> {
    const admin = await this.adminService.findByAdminName(adminName);
    if (!admin) {
      throw new Error('Admin user not found');
    }

    const passwordMatches = await argon2.verify(admin.password, password);
    if (!passwordMatches) {
      throw new Error('Invalid password');
    }

    const jwtPayload: JwtData = {
      id: admin._id.toString(),  
    };

    const jwt = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get<string>('jwtSecret'),
      expiresIn: this.configService.get<string>('jwtExpiration'),
    });

    return { jwt };
  }

  async validateAdmin(adminName: string, password: string): Promise<any> {
    const admin = await this.adminService.findByAdminName(adminName);

    if (admin && await argon2.verify(admin.password, password)) {
      const { password, ...result } = admin.toObject();  
      return result;
    }

    return null;
  }
}
