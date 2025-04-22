import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { MongooseModule } from "@nestjs/mongoose"; 
import { PostSchema } from "src/types/schema/Post";
import { FileModule } from "src/file/file.module";

@Module({
    imports:[
        MongooseModule.forFeature([{
            name: 'Posts',
            schema: PostSchema
        }]),
        FileModule
    ],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService]
})
export class PostModule{}
