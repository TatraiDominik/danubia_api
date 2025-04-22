import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { Instructor, InstructorDocument } from "src/types/schema/Instructor";

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel('Instructors')
    private readonly instructorModel: Model<InstructorDocument> 
  ) {}

  
  async createInstructor(data: {
    fullName: string;
    subject: string;
    bio: string;
    locations?: string[];  
    email: string;
    mobile?: string;       
    facebook?: string;     
    instagram?: string;    
  }): Promise<InstructorDocument> {
    const { fullName, subject, bio, email, locations, mobile, facebook, instagram } = data;
  
    const dbInstructor = new this.instructorModel({
      fullName,
      subject,
      bio,
      email,
      locations: locations || [],  
      mobile,
      facebook,
      instagram,
    });
  
    await dbInstructor.save();
    return dbInstructor;
  }

  async createInstructorWithPfp(data: {
    fullName: string;
    subject: string;
    bio: string;
    locations?: string[];  
    email: string;
    mobile?: string;       
    facebook?: string;     
    instagram?: string;    
  }, pfp: Types.ObjectId): Promise<InstructorDocument> {
    const { fullName, subject, bio, email, locations, mobile, facebook, instagram } = data;
  
    const dbInstructor = new this.instructorModel({
      fullName,
      subject,
      bio,
      email,
      locations: locations || [],  
      mobile,
      facebook,
      instagram,
      pfp,
    });
  
    await dbInstructor.save();
    return dbInstructor;
  }

  
  async findById(id: Types.ObjectId): Promise<InstructorDocument | null> {
    return await this.instructorModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<InstructorDocument | null> {
    return await this.instructorModel.findOne({ email }).exec();
  }
  
  async findAll(): Promise<InstructorDocument[]> {
    return this.instructorModel.find().exec();
  }


  async updateInstructor(id: Types.ObjectId, data: {
    fullName?: string;
    subject?: string;
    bio?: string;
    locations?: string[];  
    email?: string;
    mobile?: string;       
    facebook?: string;     
    instagram?: string; 
    pfp?: Types.ObjectId   
  }): Promise<InstructorDocument | null> {
    return this.instructorModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteInstructor(id: Types.ObjectId): Promise<InstructorDocument | null> {
    return this.instructorModel.findByIdAndDelete(id).exec();
  }
}
