import { Injectable } from '@nestjs/common';
import { CreateCollecteurDto } from './dto/create-collecteur.dto';
import { UpdateCollecteurDto } from './dto/update-collecteur.dto';

@Injectable()
export class CollecteurService {
  create(createCollecteurDto: CreateCollecteurDto) {
    return 'This action adds a new collecteur';
  }

  findAll() {
    return `This action returns all collecteur`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collecteur`;
  }

  update(id: number, updateCollecteurDto: UpdateCollecteurDto) {
    return `This action updates a #${id} collecteur`;
  }

  remove(id: number) {
    return `This action removes a #${id} collecteur`;
  }
}
