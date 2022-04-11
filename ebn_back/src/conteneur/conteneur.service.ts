import { Injectable } from '@nestjs/common';
import { CreateConteneurDto } from './dto/create-conteneur.dto';
import { UpdateConteneurDto } from './dto/update-conteneur.dto';

@Injectable()
export class ConteneurService {
  create(createConteneurDto: CreateConteneurDto) {
    return 'This action adds a new conteneur';
  }

  findAll() {
    return `This action returns all conteneur`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conteneur`;
  }

  update(id: number, updateConteneurDto: UpdateConteneurDto) {
    return `This action updates a #${id} conteneur`;
  }

  remove(id: number) {
    return `This action removes a #${id} conteneur`;
  }
}
