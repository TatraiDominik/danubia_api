import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ObjectId } from "mongodb";

export enum CoWorkerType {
    REGULAR = 'regular',
    EDUCATIONAL_SUPPORT = 'educational_support',
    INSTITUTION_LEADERSHIP = 'institution_leadership'
}

export type CoWorkerDocument = HydratedDocument<CoWorker>;

@Schema({timestamps: true})
export class CoWorker{
    _id: Types.ObjectId;

    @Prop({required: true, enum: CoWorkerType, default: CoWorkerType.REGULAR})
    type: CoWorkerType;

    @Prop({required: false})
    occupation: string;

    @Prop({required: true})
    fullName: string;

    @Prop({required: true})
    bio: string;

    @Prop({required: false})
    locations: string[]

    @Prop({required: true})
    email: string

    @Prop({required:false})
    mobile: string;

    @Prop({required:false})
    facebook: string;

    @Prop({required:false})
    instagram: string;

    @Prop({type: Types.ObjectId})
    pfp: ObjectId;

    @Prop({required: true, default:0})
    _schemaVersion: number;

    createdAt: Date;

    updatedAt: Date;
}   

export const CoWorkerSchema = SchemaFactory.createForClass(CoWorker);
