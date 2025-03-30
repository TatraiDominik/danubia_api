import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import configuration from 'src/configuration';
import { InstructorModule } from 'src/instructor/instructor.module';
import { PostModule } from 'src/post/post.module';
import { FileModule } from 'src/file/file.module';
import { CoWorkerModule } from 'src/coworker/coworker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    InstructorModule,
    PostModule,
    FileModule,
    CoWorkerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
