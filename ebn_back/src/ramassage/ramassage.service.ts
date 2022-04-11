import { Injectable } from '@nestjs/common';
import { CreateRamassageDto } from './dto/create-ramassage.dto';
import { UpdateRamassageDto } from './dto/update-ramassage.dto';

@Injectable()
export class RamassageService {
  create(createRamassageDto: CreateRamassageDto) {
    return 'This action adds a new ramassage';
  }

  findAll() {
    return `This action returns all ramassage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ramassage`;
  }

  update(id: number, updateRamassageDto: UpdateRamassageDto) {
    return `This action updates a #${id} ramassage`;
  }

  remove(id: number) {
    return `This action removes a #${id} ramassage`;
  }
}
