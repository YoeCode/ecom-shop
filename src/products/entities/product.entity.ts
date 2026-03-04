import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' } /*Renaming de tablas*/)
export class Product {
  @ApiProperty({
    example: '0ee437ce-414a-4be3-8610-5cb16500fe0e',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'T-Shirt',
    description: 'Product title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;
  @ApiProperty({
    example: 19.99,
    description: 'Product price',
  })
  @Column('float', {
    default: 0,
  })
  price: number;
  @ApiProperty({
    example: 'A comfortable t-shirt',
    description: 'Product description',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  @ApiProperty({
    example: 't_shirt',
    description: 'Product slug',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;
  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0,
  })
  @Column('int', {
    default: 0,
  })
  stock: number;
  @ApiProperty({
    example: ['S', 'M', 'L'],
    description: 'Product sizes',
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];
  @ApiProperty({
    example: 'unisex',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;
  @ApiProperty({
    example: ['cotton', 'comfortable'],
    description: 'Product tags',
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];
  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'Product images',
  })
  @OneToMany(() => ProductImage, (productsImage) => productsImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @BeforeInsert()
  checkSlug() {
    if (!this.slug) {
      this.slug = this.title;

      this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
  }
  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
