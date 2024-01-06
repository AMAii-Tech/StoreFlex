import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { Users } from 'src/users/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private emailSerive: EmailService,
    ) {}

    async signIn(email: string, pass: string) {
        const user = await this.userService.findOne(email);
        if (!user || !(await compare(pass, user.password))) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.user_id, email: user.email };
        return {
            name: user.name,
            email: user.email,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(name: string, email: string, password: string) {
        const user = await this.userService.createUser({
            name,
            email,
            password,
        });
        if (user) {
            this.emailSerive.sendEmail({
                subject: 'Verification',
                body: user.verification_token,
                to: user.email,
            });
            return {
                name: user.name,
                username: user.email,
            };
        }
    }

    async verifyUser(token) {
        const user: Users = await this.userService.activateUser(token);
        if (!user)
            return {
                error: 'Invalid Token',
            };
        return {
            name: user.name,
            email: user.email,
        };
    }
}
