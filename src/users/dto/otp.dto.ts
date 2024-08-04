import { ApiProperty } from "@nestjs/swagger";

export class otpDto {
    @ApiProperty()
    readonly id: string;
    @ApiProperty()
    readonly otp: number;

}