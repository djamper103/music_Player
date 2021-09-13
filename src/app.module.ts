import { Module } from "@nestjs/common";
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[
        MongooseModule.forRoot('mongodb+srv://admin:admin@music-player.zjk1o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
        TrackModule
    ]
})

export class AppModule{}