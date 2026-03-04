import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    example: 'T-Shirt',
    description: 'Product title',
    uniqueItems: true,
    nullable: false,
    minLength: 1,
  })
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    example: 19.99,
    description: 'Product price',
    nullable: true,
    minimum: 0.01,
  })
  price?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'A comfortable t-shirt',
    description: 'Product description',
    nullable: true,
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 't_shirt',
    description: 'Product slug',
    uniqueItems: true,
  })
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    example: 10,
    description: 'Product stock',
    nullable: true,
    minimum: 0,
  })
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  @ApiProperty({
    example: ['S', 'M', 'L'],
    description: 'Product sizes',
  })
  sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  @ApiProperty({
    example: 'unisex',
    description: 'Product gender',
    enum: ['men', 'women', 'kid', 'unisex'],
  })
  gender: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: ['cotton', 'comfortable'],
    description: 'Product tags',
    nullable: true,
  })
  tags: string[];

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'Product images',
    nullable: true,
  })
  images: string[];
}
