import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { Types } from 'mongoose';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}


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
}
