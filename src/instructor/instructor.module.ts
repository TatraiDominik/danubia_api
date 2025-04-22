import { Module } from "@nestjs/common";
import { InstructorService } from "./instructor.service";
import {InstructorController} from './instructor.controller';
import { MongooseModule } from "@nestjs/mongoose"; 
import { InstructorSchema } from "src/types/schema/Instructor";
import { FileModule } from "src/file/file.module";

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'Instructors', schema: InstructorSchema}]),
        FileModule
    ],
    providers: [InstructorService],
    controllers: [InstructorController],
    exports: [InstructorService]
})
export class InstructorModule {}
