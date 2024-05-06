import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma.service';
import { log } from 'console';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto) {
    console.log(createAddressDto);

    const address = await this.prisma.address.create({
      data: createAddressDto,
    });

    return address;
  }

  findAll() {
    return `This action returns all addresses`;
  }

  async findByUser(userId: number) {
    console.log(userId);
    // TODO change findmany to findfirst or findunique
    const address = this.prisma.address.findMany({
      where: {
        userId,
      },
    });

    return address;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
