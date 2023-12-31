import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeOrmExceptionFilter } from './typeorm-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new TypeOrmExceptionFilter());
    app.enableCors();
    await app.listen(5000);
}
bootstrap();
