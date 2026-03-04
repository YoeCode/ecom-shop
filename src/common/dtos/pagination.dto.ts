import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({
    default: 10,
    example: 10,
    description: 'Number of items to return',
  })
  @Type(() => Number)
  //Tranformar
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({
    default: 0,
    example: 0,
    description: 'Number of items to skip',
  })
  offset?: number;
}
