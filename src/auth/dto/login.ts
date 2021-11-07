import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class Login {

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    password: string;
}