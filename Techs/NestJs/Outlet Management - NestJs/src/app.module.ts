import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OutletManagerModule } from './outlet-manager/outlet-manager.module';
import { ProductModule } from './product/product.module';
import { GlobalExceptionsFilter } from './filter/global-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PWD'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        }
      }
    }),
    AuthModule,
    UserModule,
    AdminModule,
    OutletManagerModule,
    ProductModule
  ],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: GlobalExceptionsFilter,
  },],
})
export class AppModule {}
