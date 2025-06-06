import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging/logging.middleware';

@Module({
    imports: [ConfigModule],
    providers: [{ provide: 'APP_GUARD', useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
} 
