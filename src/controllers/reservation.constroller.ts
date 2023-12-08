import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { ReservationEntity } from '../entities/reservation.entity';
import { CreateCheckInOrCheckOutReservationBody } from 'src/dtos/checkin-reservation-body';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get(':id')
  async getReservation(
    @Param('id') idEstablishment: string,
  ): Promise<ReservationEntity[]> {
    const reservation =
      await this.reservationService.getAllReservationByEstablishment(
        idEstablishment,
      );

    return reservation;
  }

  @Post('checkin')
  async checkIn(
    @Body() body: CreateCheckInOrCheckOutReservationBody,
  ): Promise<void> {
    const { fkVehicle, fkEstablishment } = body;

    await this.reservationService.checkIn({
      fkVehicle,
      fkEstablishment,
      checkInDateTime: new Date(),
    });

    return;
  }

  @Post('checkout')
  async checkOut(
    @Body() body: CreateCheckInOrCheckOutReservationBody,
  ): Promise<void> {
    const { fkVehicle, fkEstablishment } = body;

    await this.reservationService.checkOut({
      fkVehicle,
      fkEstablishment,
    });

    return;
  }
}
