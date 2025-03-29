import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { Types } from 'mongoose';
import { FileService } from 'src/file/file.service'; 

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly fileService: FileService 
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) 
  async create(
    @Body() data: {
      title?: string;
      content?: string;
      fbPostLink?: string;
      igPostLink?: string;
      media?: Types.ObjectId | null; 
    },
    @UploadedFile() file: Express.Multer.File 
  ) {
    let media: Types.ObjectId | null = null;
    if (file) {
      
      const uploadedFile = await this.fileService.uploadFile(file, 'post_media');
      media = uploadedFile._id; 
    }

    
    return this.postService.createPost({
      ...data,
      media, 
    });
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.postService.findById(new Types.ObjectId(id));
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() data: {
      title?: string;
      content?: string;
      fbPostLink?: string;
      igPostLink?: string;
      media?: Types.ObjectId | null; 
    },
    @UploadedFile() file: Express.Multer.File 
  ) {
    let media: Types.ObjectId | null = null;
    if (file) {
      const uploadedFile = await this.fileService.uploadFile(file, 'post_media');
      media = uploadedFile._id;
    }


    const updateData = { ...data, media };
    return this.postService.updatePost(new Types.ObjectId(id), updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.postService.deletePost(new Types.ObjectId(id));
  }
}
