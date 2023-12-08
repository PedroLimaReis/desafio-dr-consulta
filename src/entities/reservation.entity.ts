import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { VehicleEntity } from './vehicle.entity';
import { EstablishmentEntity } from './establishment.entity';

@Entity()
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => EstablishmentEntity, (establishment) => establishment.id)
  fkEstablishment: EstablishmentEntity;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.id)
  fkVehicle: VehicleEntity;

  @Column()
  checkInDateTime?: Date;

  @Column({ default: null })
  checkOutDateTime?: Date;
}
