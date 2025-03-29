import { Module } from "@nestjs/common";
import { InstructorService } from "./instructor.service";
import {InstructorController} from './instructor.controller';
import { MongooseModule } from "@nestjs/mongoose"; 
import { Collections } from "src/types/Collections";
import { InstructorSchema } from "src/types/schema/Instructor";

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Collections.Instructors, schema: InstructorSchema}])
    ],
    providers: [InstructorService],
    controllers: [InstructorController],
    exports: [InstructorService]
})
export class InstructorModule {}