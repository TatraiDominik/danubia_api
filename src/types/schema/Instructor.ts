import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InstructorDocument = HydratedDocument<Instructor>;

@Schema({timestamps: true})
export class Instructor{
    _id: Types.ObjectId;

    @Prop({required: true})
    fullName: string;

    @Prop({required: true})
    subject: string;

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

    /**
     * The property we have for helping database migrations.
     * If we ever update the schema definition, we can increment
     * this field on every newly generated document. This way,
     * we'll have an easy way of obviously differentiating between
     * multiple schema definitions in the same collection. 
     */
    @Prop({required: true, default:0})
    _schemaVersion: number;

    createdAt: Date;

    updatedAt: Date;
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);