import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReservationEntity } from './reservation.entity';

@Entity()
export class VehicleEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  brand: string;

  @Column('char', { length: 14 })
  model: string;

  @Column()
  color: string;

  @Column()
  plate: string;

  @Column({
    type: 'enum',
    enum: ['Carro', 'Moto'],
  })
  type: string;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.fkVehicle)
  fkEstablishment?: ReservationEntity;
}
