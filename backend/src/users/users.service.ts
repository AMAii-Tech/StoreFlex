import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    findOne(username): Promise<Users> {
        return this.usersRepository.findOneBy({ username });
    }

    createUser({ name, username, password }): Promise<Users> {
        const user = new Users();
        user.name = name;
        user.username = username;
        user.password = password;
        return this.usersRepository.save(user);
    }
}
