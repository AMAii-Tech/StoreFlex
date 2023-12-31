import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly saltOrRound = 10;
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    findOne(email): Promise<Users> {
        return this.usersRepository.findOneBy({ email });
    }

    createUser({ name, email, password }): Promise<Users> {
        const user = new Users();
        user.name = name;
        user.email = email;
        user.password = hashSync(password, this.saltOrRound);
        return this.usersRepository.save(user);
    }
}
