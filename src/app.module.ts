import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'drconsulta',
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
