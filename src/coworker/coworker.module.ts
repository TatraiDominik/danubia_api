import { Module } from "@nestjs/common";
import { CoWorkerService } from "./coworker.service";
import { CoworkerController } from "./coworker.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CoWorkerSchema } from "src/types/schema/CoWorker";
import { FileModule } from "src/file/file.module";

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'CoWorkers', schema:CoWorkerSchema}]),
        FileModule
    ],
    providers:[CoWorkerService],
    controllers: [CoworkerController],
    exports:[CoWorkerService]
})
export class CoWorkerModule{};
