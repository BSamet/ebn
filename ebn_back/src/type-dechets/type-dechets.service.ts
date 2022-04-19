import { Injectable } from '@nestjs/common';
import { CreateTypeDechetDto } from './dto/create-type-dechet.dto';
import { UpdateTypeDechetDto } from './dto/update-type-dechet.dto';

@Injectable()
export class TypeDechetsService {
  create(createTypeDechetDto: CreateTypeDechetDto) {
    return 'This action adds a new typeDechet';
  }

  findAll() {
    return `This action returns all typeDechets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeDechet`;
  }

  update(id: number, updateTypeDechetDto: UpdateTypeDechetDto) {
    return `This action updates a #${id} typeDechet`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeDechet`;
  }
}
