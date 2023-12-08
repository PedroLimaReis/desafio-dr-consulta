import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from 'src/entities/reservation.entity';
import { ReservationService } from 'src/services/reservation.service';
import { ReservationController } from 'src/controllers/reservation.constroller';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
