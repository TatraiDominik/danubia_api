import { Controller, Get, Post, Body, Param, Put, Delete,BadRequestException } from '@nestjs/common';

import { PostService } from './post.service';
import { Types } from 'mongoose';

@Controller('post')
export class PostController{
    constructor(private readonly postService: PostService){}

    @Post()
    async create(@Body() data: {
        title?:string,
        content?:string,
        fbPostLink?:string,
        igPostLink?:string
    }) {
        return this.postService.createPost(data);
    }

    @Get()
    async findAll(){
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
    async update(@Param('id') id: string, @Body() data:{
        title?:string,
        content?:string,
        fbPostLink?:string,
        igPostLink?:string
    }){
        return this.postService.updatePost(new Types.ObjectId(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }
        return this.postService.deletePost(new Types.ObjectId(id));
    }
}   