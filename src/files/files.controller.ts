import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import express from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  @ApiOperation({ summary: 'Get a product image' })
  @ApiParam({
    name: 'imageName',
    required: true,
    type: 'string',
    description: 'Name of the product image file',
  })
  @ApiResponse({
    status: 200,
    description: 'Image file returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  findOneProductImage(
    @Res() res: express.Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductIamge(imageName);
    res.sendFile(path);
  }

  @Post('product')
  @ApiOperation({ summary: 'Upload a product image' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully, returns secure URL.',
    schema: {
      properties: {
        secureUrl: {
          type: 'string',
          example: 'http://localhost:3000/files/product/image-12345.jpg',
          description: 'Secure URL to access the uploaded image',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. No image file provided or invalid file type.',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  updloadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('make sure that the file is an image');

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;
    return {
      secureUrl: secureUrl,
    };
  }
}
