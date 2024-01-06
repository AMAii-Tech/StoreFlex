import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { EmailModule } from './email/email.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.HOST,
            port: Number(process.env.PORT),
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            entities: [Users],
            synchronize: true,
        }),
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsersModule,
        EmailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
