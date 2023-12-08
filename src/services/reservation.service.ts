import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from 'src/entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,
  ) {}

  async getAllReservationByEstablishment(
    id: string,
  ): Promise<ReservationEntity[]> {
    return this.reservationRepository.find({
      relations: { fkVehicle: true },
      where: { fkEstablishment: { id } },
    });
  }

  async checkIn(newReservation: ReservationEntity): Promise<ReservationEntity> {
    return this.reservationRepository.save(newReservation);
  }

  async checkOut(reservation: ReservationEntity): Promise<void> {
    this.reservationRepository.update(
      {
        fkEstablishment: reservation.fkEstablishment,
        fkVehicle: reservation.fkVehicle,
      },
      { checkOutDateTime: new Date() },
    );
    return;
  }
}
