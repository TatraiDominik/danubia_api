import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CoWorkerService } from './coworker.service';
import { FileService } from 'src/file/file.service';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImATeapotException } from '@nestjs/common';
import { CoWorkerType } from 'src/types/schema/CoWorker';

@Controller('coworker')
export class CoworkerController {
    constructor(
        private readonly coworkerService: CoWorkerService,
        private readonly fileService: FileService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() data: {
            fullName: string;
            bio: string;
            locations?: string[];  
            email: string;
            mobile?: string;       
            facebook?: string;     
            instagram?: string;
            type?: CoWorkerType;
            occupation?: string;
        },
        @UploadedFile() file?: Express.Multer.File
    ) {
        const coworkerData = { ...data };
        
        if (file) {
            const dbFile = await this.fileService.uploadFile(file, 'profile_picture');
            return this.coworkerService.createCoWorkerWithPfp(coworkerData, dbFile);
        }
        
        return this.coworkerService.createCoWorker(coworkerData);
    }

    @Get()
    async findAll(){
        return this.coworkerService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.coworkerService.findById(new Types.ObjectId(id));
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string){
        return this.coworkerService.findByEmail(email);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: {
        fullName?: string;
        bio?: string;
        locations?: string[];  
        email?: string;
        mobile?: string;       
        facebook?: string;     
        instagram?: string;
        type?: CoWorkerType;
        occupation?: string;
      }) {
        return this.coworkerService.updateCoWorker(new Types.ObjectId(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.coworkerService.deleteCoWorker(new Types.ObjectId(id));
    }
    
    @Put(':id/pfp')
    @UseInterceptors(FileInterceptor('file'))
    async updatePfp(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file) throw new ImATeapotException();

        const dbFile = await this.fileService.uploadFile(file, 'profile_picture');
        return this.coworkerService.updateCoWorker(new Types.ObjectId(id), {
            pfp:dbFile
        });
    }

    @Delete(':id/pfp')
    async deletePfp(@Param('id') id: string){
        return this.coworkerService.updateCoWorker(new Types.ObjectId(id), {
            pfp:undefined
        });
    }
}
