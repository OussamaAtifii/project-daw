import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    const brandExists = await this.prisma.brand.findUnique({
      where: {
        name: createBrandDto.name,
      },
    });

    if (brandExists) {
      throw new ConflictException('La marca ya existe');
    }

    try {
      const createdBrand = await this.prisma.brand.create({
        data: createBrandDto,
      });

      return createdBrand;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la marca');
    }
  }

  async findAll() {
    try {
      const brands = await this.prisma.brand.findMany({
        orderBy: { id: 'asc' },
      });
      return brands;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las marcas');
    }
  }

  async findOne(id: number) {
    try {
      const brand = await this.prisma.brand.findUnique({
        where: { id },
      });

      if (!brand) {
        throw new NotFoundException(`Marca con id ${id} no encontrada`);
      }

      return brand;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener la marca');
    }
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brandExists = await this.prisma.brand.findUnique({
      where: { id },
    });

    if (!brandExists) {
      throw new NotFoundException(`Marca con id ${id} no encontrada`);
    }

    try {
      const updatedBrand = this.prisma.brand.update({
        where: { id },
        data: updateBrandDto,
      });

      return updatedBrand;
    } catch (error) {
      throw new InternalServerErrorException('Error al modificar la marca');
    }
  }

  async remove(id: number) {
    const brandExists = await this.prisma.brand.findUnique({
      where: { id },
    });

    if (!brandExists) {
      throw new NotFoundException(`Marca con id ${id} no encontrada`);
    }

    try {
      await this.prisma.brand.delete({
        where: { id },
      });

      return { message: 'Marca eliminada correctamente' };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la marca');
    }
  }
}
