import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Product } from './entities';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product was created successfully.',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiResponse({ status: 409, description: 'Conflict. Product title already exists.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with pagination' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    example: 10,
    description: 'Number of products per page',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: 'number',
    example: 0,
    description: 'Number of products to skip',
  })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully.',
    type: [Product],
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiOperation({ summary: 'Get a product by ID or slug' })
  @ApiParam({
    name: 'term',
    required: true,
    type: 'string',
    description: 'Product ID (UUID) or slug',
  })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('term') term: string) {
    return this.productsService.findONePlain(term);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'Product ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully.',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'Product ID (UUID)',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
