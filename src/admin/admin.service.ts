import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/types/schema/Admin'; 
import * as argon2 from 'argon2';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>) {}

  async findByAdminName(adminName: string): Promise<AdminDocument | null> {
    return this.adminModel.findOne({ adminName }).exec();
  }

  async findById(id: string): Promise<AdminDocument | null> {
    return this.adminModel.findById(id).exec();
  }

  async validateAdminCredentials(adminName: string, password: string): Promise<AdminDocument | null> {
    const admin = await this.adminModel.findOne({ adminName }).exec();
    if (admin && await argon2.verify(admin.password, password)) {
      return admin;
    }
    return null;
  }


}

