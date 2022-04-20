import {Injectable} from '@nestjs/common';
import {CreateAdminDto} from './dto/create-admin.dto';
import {UpdateAdminDto} from './dto/update-admin.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Admin} from './entities/admin.entity';
import {Utilisateur} from "../utilisateurs/entities/utilisateur.entity";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
    ) {
    }

    create(createAdminDto: CreateAdminDto) {
        const admin = new Admin();
        admin.utilisateur = Object.assign(new Utilisateur(), {
            id: createAdminDto.utilisateurId,
        });
        return this.adminRepository.save(admin);
    }

    findAll() {
        return this.adminRepository.find();
    }

    findOne(id: number) {
        return this.adminRepository.findOne(id);
    }

    update(id: number, updateAdminDto: UpdateAdminDto) {
        return this.adminRepository.update(id, updateAdminDto);
    }

    remove(id: number) {
        return this.adminRepository.delete(id);
    }
}
