import { Injectable } from '@nestjs/common';
import { CreateTourneeDto } from './dto/create-tournee.dto';
import { UpdateTourneeDto } from './dto/update-tournee.dto';

@Injectable()
export class TourneeService {
  create(createTourneeDto: CreateTourneeDto) {
    return 'This action adds a new tournee';
  }

  findAll() {
    return `This action returns all tournee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournee`;
  }

  update(id: number, updateTourneeDto: UpdateTourneeDto) {
    return `This action updates a #${id} tournee`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournee`;
  }
}
