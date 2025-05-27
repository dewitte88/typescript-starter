import { IsString, IsOptional } from "class-validator";
export class CreateNameDto {
    @IsString()
    readonly name: string;

    @IsString({ each: true })
    readonly gender: string[];

    @IsString()
    @IsOptional()
    readonly description?: string;
}
