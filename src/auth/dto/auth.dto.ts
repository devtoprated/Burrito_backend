import { ApiProperty } from "@nestjs/swagger";

export class authDto {
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly password: string;
}


  