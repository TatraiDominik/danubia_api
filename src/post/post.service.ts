import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { Collections } from "src/types/Collections";
import { Post, PostDocument } from 'src/types/schema/Post';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Collections.Posts)
    private readonly postModel: Model<PostDocument>
  ) {}

  async createPost(data: {
    title?: string;
    content?: string;
    fbPostLink?: string;
    igPostLink?: string;
    media?: Types.ObjectId | null; 
  }): Promise<PostDocument> {
    const { title, content, fbPostLink, igPostLink, media } = data;

    const dbPost = new this.postModel({
      title,
      content,
      fbPostLink,
      igPostLink,
      media, 
    });

    await dbPost.save();
    return dbPost;
  }

  async findById(id: Types.ObjectId): Promise<PostDocument | null> {
    return await this.postModel.findById(id).exec();
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postModel.find().exec();
  }

  async updatePost(id: Types.ObjectId, data: {
    title?: string;
    content?: string;
    fbPostLink?: string;
    igPostLink?: string;
    media?: Types.ObjectId | null; 
  }): Promise<PostDocument | null> {
    return this.postModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deletePost(id: Types.ObjectId): Promise<PostDocument | null> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
