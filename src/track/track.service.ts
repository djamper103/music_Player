import {Injectable} from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose';
import {Track,TrackDocument} from "./shemas/track.shema"
import {Model,ObjectId} from "mongoose"
import {Comment, CommentDocument} from "./shemas/comment.shema"
import {CreateTrackDto} from "./dto/create-track-dto";
import { CreateCommentDto } from './dto/create-comment-dto';
import { FileService, FileType } from "src/file/file.serves";


@Injectable()

export class TrackService{

    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                private fileService:FileService) {}

    async create(dto:CreateTrackDto,picture,audio):Promise<Track>{
        const audioPath=this.fileService.createFile(FileType.AUDIO,audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE,picture)
        const track=await this.trackModel.create({...dto,listens:0,audio:audioPath,picture:picturePath})
        return track 
    }

    async getAll(count=10,offset=0):Promise<Track[]>{
        const traks=await this.trackModel.find().skip(Number(offset)).limit(Number(count))
        return traks
    }

    async getOne(id:ObjectId):Promise<Track>{
        const track=await (await this.trackModel.findById(id)).populate("comments")
        return track
    }

    async search(query:string):Promise<Track[]>{
        const traks=await this.trackModel.find({
            name:{$regex: new RegExp(query, 'i')}
        })
        return traks
    }

    async delete(id:ObjectId):Promise<ObjectId>{
        const track=await this.trackModel.findByIdAndDelete(id)
        return track._id
    }

    async addComment(dto:CreateCommentDto):Promise<Comment>{
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({...dto})
        track.comments.push(comment._id)
        await track.save()
        return comment
    }

    async listen(id:ObjectId){
        const track=await this.trackModel.findById(id)
        track.listens += 1
        track.save()
    }
}