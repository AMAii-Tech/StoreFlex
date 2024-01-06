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
        user.verification_token = hashSync(email, this.saltOrRound);
        return this.usersRepository.save(user);
    }

    async activateUser(token): Promise<Users> {
        const user = await this.usersRepository.findOneBy({
            verification_token: token,
        });
        if (!user) {
            return null;
        }
        user.is_verified = true;
        user.verification_token = '';
        return this.usersRepository.save(user);
    }
}
