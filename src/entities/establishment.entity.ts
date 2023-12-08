import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ReservationEntity } from './reservation.entity';

@Entity()
export class EstablishmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column('char', { length: 14 })
  cnpj: string;

  @Column({})
  address: string;

  @Column()
  telephone: string;

  @Column()
  spaceForMotocycles: number;

  @Column()
  spaceForCar: number;

  @Column({ default: null })
  disabledAt?: Date;

  @OneToMany(
    () => ReservationEntity,
    (reservation) => reservation.fkEstablishment,
  )
  fkEstablishment?: ReservationEntity;
}
