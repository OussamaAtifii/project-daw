import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = await this.prisma.review.create({
      data: createReviewDto,
    });

    const reviewWithUser = await this.prisma.review.findUnique({
      where: {
        id: review.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return reviewWithUser;
  }

  findAll() {
    return `This action returns all reviews`;
  }

  async findByProduct(productId: number) {
    const reviews = await this.prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return reviews;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
