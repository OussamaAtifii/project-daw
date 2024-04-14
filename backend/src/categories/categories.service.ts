import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (categoryExists) {
      throw new ConflictException('La categoria ya existe');
    }

    try {
      const createdCategory = await this.prisma.category.create({
        data: createCategoryDto,
      });

      return createdCategory;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la categoria');
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las categorias');
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
      });

      if (!category) {
        throw new NotFoundException(`Categoria con id ${id} no encontrada`);
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error al obtener la categoria');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    console.log(updateCategoryDto);
    const categoryExists = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    }

    try {
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });

      return updatedCategory;
    } catch (error) {
      throw new InternalServerErrorException('Error al modificar la categoria');
    }
  }

  async remove(id: number) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoryExists) {
      throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    }

    try {
      await this.prisma.category.delete({
        where: { id },
      });

      return { message: 'Categoria eliminada correctamente' };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la categoria');
    }
  }
}
