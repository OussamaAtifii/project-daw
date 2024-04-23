import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        name: createProductDto.name,
      },
    });

    if (productExists) {
      throw new ConflictException('El producto ya existe');
    }

    try {
      const createdProduct = await this.prisma.product.create({
        data: createProductDto,
      });

      return createdProduct;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany({});
      return products;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al obtener el producto');
    }
  }

  async findByCategory(categoryId: number) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundException(
        `Categoria con id ${categoryId} no encontrada`,
      );
    }

    try {
      const products = await this.prisma.product.findMany({
        where: {
          categoryId,
        },
        include: {
          brand: {},
        },
      });

      return products;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los productos de la categoria',
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productExists = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });

      return updatedProduct;
    } catch (error) {
      throw new InternalServerErrorException('Error al modificar el producto');
    }
  }

  async remove(id: number) {
    const productExists = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    try {
      await this.prisma.product.delete({
        where: { id },
      });

      return { message: 'Producto eliminado correctamente' };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }
}
