import { Delete, Get,Param, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { CreateTrackDto } from "./dto/create-track-dto";
import { TrackService } from './track.service';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment-dto';
import { FileFieldsInterceptor } from "@nestjs/platform-express/multer";

@Controller('/tracks')
export class TrackController{
    
    constructor(private TrackService:TrackService){}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
        ]))
    create(@UploadedFiles() files, @Body() dto:CreateTrackDto){
        const [picture,audio]=files
        return this.TrackService.create(dto,picture,audio)
    }

    @Get()
    getAll(){
        return this.TrackService.getAll()
    }

    @Get(":id")
    getOne(@Param("id") id:ObjectId){
        return this.TrackService.getOne(id)
    }

    @Delete(":id")
    delete(@Param("id") id:ObjectId){
        return this.TrackService.delete(id)
    } 

    @Post("/comment")
    addComment(@Body() dto: CreateCommentDto){
        return this.TrackService.addComment(dto)
    }

}