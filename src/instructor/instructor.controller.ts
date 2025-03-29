import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { FileService } from 'src/file/file.service'; // FileService hozzáadása
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImATeapotException } from '@nestjs/common';

@Controller('instructor')
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly fileService: FileService, 
  ) {}

  @Post()
  async create(@Body() data: {
    fullName: string;
    subject: string;
    bio: string;
    locations?: string[];  
    email: string;
    mobile?: string;       
    facebook?: string;     
    instagram?: string;    
  }) {
    return this.instructorService.createInstructor(data);
  }

  @Get()
  async findAll() {
    return this.instructorService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.instructorService.findById(new Types.ObjectId(id));
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.instructorService.findByEmail(email);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: {
    fullName?: string;
    subject?: string;
    bio?: string;
    locations?: string[];  
    email?: string;
    mobile?: string;       
    facebook?: string;     
    instagram?: string;    
  }) {
    return this.instructorService.updateInstructor(new Types.ObjectId(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.instructorService.deleteInstructor(new Types.ObjectId(id));
  }

  
  @Put(':id/pfp')
  @UseInterceptors(FileInterceptor('file'))
  async updatePfp(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) throw new ImATeapotException(); 

   
    const dbFile = await this.fileService.uploadFile(file, 'profile_picture');
    return this.instructorService.updateInstructor(new Types.ObjectId(id), { pfp: dbFile });
  }

 
  @Delete(':id/pfp')
  async deletePfp(@Param('id') id: string) {
    return this.instructorService.updateInstructor(new Types.ObjectId(id), { pfp: undefined });
  }
}
