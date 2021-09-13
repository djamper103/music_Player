import { ObjectId } from 'mongoose';


export class CreateCommentDto{
    readonly name:string;
    readonly text:string;
    readonly trackId:ObjectId;
}