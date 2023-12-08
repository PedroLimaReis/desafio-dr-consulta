import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  user: string;

  @Column()
  password: string;
}
