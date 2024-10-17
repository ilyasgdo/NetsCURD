import {IsNotEmpty} from "class-validator"
export class CreatePostDTO{
    @IsNotEmpty()
    readonly title: string
    @IsNotEmpty()
    readonly body : string
    
}