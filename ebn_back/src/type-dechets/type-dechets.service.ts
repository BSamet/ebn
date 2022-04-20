import {Injectable} from '@nestjs/common';
import {CreateTypeDechetDto} from './dto/create-type-dechet.dto';
import {UpdateTypeDechetDto} from './dto/update-type-dechet.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TypeDechet} from "./entities/type-dechet.entity";

@Injectable()
export class TypeDechetsService {
    constructor(
        @InjectRepository(TypeDechet)
        private readonly typeDechetsRepository: Repository<TypeDechet>,
    ) {
    }

    create(createTypeDechetDto: CreateTypeDechetDto) {
        const typeDechets = new TypeDechet();
        typeDechets.typeDechets = createTypeDechetDto.typeDechets;
        return this.typeDechetsRepository.save(typeDechets);
    }

    findAll() {
        return this.typeDechetsRepository.find();
    }

    findOne(id: number) {
        return this.typeDechetsRepository.findOne(id);
    }

    update(id: number, updateTypeDechetDto: UpdateTypeDechetDto) {
        return this.typeDechetsRepository.update(
            id,
            updateTypeDechetDto,
        );
    }

    remove(id: number) {
        return this.typeDechetsRepository.delete(id);
    }
}
