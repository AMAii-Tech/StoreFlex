import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string, pass: string) {
        const user = await this.userService.findOne(username);
        if (!user || !(await compare(pass, user.password))) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.user_id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(name: string, username: string, password: string) {
        const user = await this.userService.createUser({
            name,
            username,
            password,
        });
        if (user) {
            return {
                name: user.name,
                username: user.username,
            };
        }
    }
}
