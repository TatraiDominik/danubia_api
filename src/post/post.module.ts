import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { MongooseModule } from "@nestjs/mongoose"; 
import { Collections } from "src/types/Collections";
import { PostSchema } from "src/types/schema/Post";

@Module({
    imports:[
        MongooseModule.forFeature([{
            name: Collections.Posts,
            schema: PostSchema
        }])
    ],
    providers: [PostService],
    controllers: [PostController],
    exports: [PostService]
})
export class PostModule{}