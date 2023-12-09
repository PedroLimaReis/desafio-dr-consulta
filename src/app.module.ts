import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { EstablishmentEntity } from './entities/establishment.entity';
import { VehicleEntity } from './entities/vehicle.entity';
import { EstablishmentModule } from './modules/establishment.module';
import { VehicleModule } from './modules/vehicle.module';
import { ReservationModule } from './modules/reservation.module';
import { ReservationEntity } from './entities/reservation.entity';
import { EmployeeModule } from './modules/employee.module';
import { EmployeeEntity } from './entities/employee.entity';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME_DATABASE,
      password: process.env.PASSWORD_DATABASE,
      database: process.env.DATABASE,
      entities: [
        EstablishmentEntity,
        VehicleEntity,
        ReservationEntity,
        EmployeeEntity,
      ],
      synchronize: true,
    }),
    EstablishmentModule,
    VehicleModule,
    ReservationModule,
    EmployeeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
