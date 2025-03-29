import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true})
export class Post{
    _id: Types.ObjectId;

    @Prop({required: true})
    title: string;

    @Prop({ required: true})
    content: string;

    @Prop({ required: false})
    fbPostLink: string;

    @Prop({ required: false})
    igPostLink: string;

    @Prop({required: true, default:0})
    _schemaVersion: number;

    createdAt: Date;

    updatedAt: Date;
}