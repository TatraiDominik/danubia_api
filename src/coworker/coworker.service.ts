import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { Collections } from "src/types/Collections";
import { CoWorker, CoWorkerDocument, CoWorkerType } from "src/types/schema/CoWorker";

@Injectable()
export class CoWorkerService {
    constructor(
        @InjectModel(Collections.CoWorkers)
        private readonly coworkerModel: Model<CoWorkerDocument>
    ) {}

    async createCoWorker(data: {
        fullName: string;
        bio: string;
        locations?: string[];  
        email: string;
        mobile?: string;       
        facebook?: string;     
        instagram?: string;
        type?: CoWorkerType;
        occupation?: string;
    }): Promise<CoWorkerDocument>{
        const { fullName, bio, email, locations, mobile, facebook, instagram, type, occupation } = data;
  
        const dbCoworker = new this.coworkerModel({
          fullName,
          bio,
          email,
          locations: locations || [],  
          mobile,
          facebook,
          instagram,
          type,
          occupation,
        });
      
        await dbCoworker.save();
        return dbCoworker;
    }

    async createCoWorkerWithPfp(data: {
        fullName: string;
        bio: string;
        locations?: string[];  
        email: string;
        mobile?: string;       
        facebook?: string;     
        instagram?: string;
        type?: CoWorkerType;
        occupation?: string;
    }, pfp: Types.ObjectId): Promise<CoWorkerDocument>{
        const { fullName, bio, email, locations, mobile, facebook, instagram, type, occupation } = data;
  
        const dbCoworker = new this.coworkerModel({
          fullName,
          bio,
          email,
          locations: locations || [],  
          mobile,
          facebook,
          instagram,
          type,
          occupation,
          pfp,
        });
      
        await dbCoworker.save();
        return dbCoworker;
    }

    async findById(id: Types.ObjectId): Promise<CoWorkerDocument | null> {
        return await this.coworkerModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<CoWorkerDocument | null> {
        return await this.coworkerModel.findOne({ email }).exec();
    }

    async findAll(): Promise<CoWorkerDocument[]> {
        return this.coworkerModel.find().exec();
    }

    async updateCoWorker(id: Types.ObjectId, data: {
        fullName?: string;
        subject?: string;
        bio?: string;
        locations?: string[];  
        email?: string;
        mobile?: string;       
        facebook?: string;     
        instagram?: string; 
        pfp?: Types.ObjectId;
        type?: CoWorkerType;
        occupation?: string;
    }): Promise<CoWorkerDocument | null> {
        return this.coworkerModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    
    async deleteCoWorker(id: Types.ObjectId): Promise<CoWorkerDocument | null> {
        return this.coworkerModel.findByIdAndDelete(id).exec();
    }
    
}
