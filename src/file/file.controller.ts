import { Controller, Get, Param, StreamableFile, Res, NotFoundException } from "@nestjs/common";
import { FileService } from "./file.service";
import { ObjectId } from 'mongodb';

@Controller('file')
export class FileController {

    constructor(private readonly fileService: FileService) { }

    @Get(':id')
    async getFile(@Param('id') id: string) {
        const objid = new ObjectId(id);
        const fileStream = await this.fileService.streamFile(objid);
        const fileData = await this.fileService.getFileByObjectId(objid);

        if (!fileData) {
            throw new NotFoundException("File not found");
        }

        return new StreamableFile(fileStream, { type: fileData?.metadata?.contentType || "application/octet-stream" });
    }
}
