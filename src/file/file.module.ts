import {Module} from "@nestjs/common"
import {FileService } from "./file.serves";

@Module({
    providers:[FileService]
})

export class FileModule{}