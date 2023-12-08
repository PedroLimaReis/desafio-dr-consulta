import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { EstablishmentEntity } from '../entities/establishment.entity';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(EstablishmentEntity)
    private establishmentRepository: Repository<EstablishmentEntity>,
  ) {}

  async created(
    newEstablishment: EstablishmentEntity,
  ): Promise<EstablishmentEntity> {
    return this.establishmentRepository.save(newEstablishment);
  }

  async findAll(): Promise<EstablishmentEntity[]> {
    return this.establishmentRepository.find({
      where: { disabledAt: IsNull() },
    });
  }

  async findOneById(id: string): Promise<EstablishmentEntity | null> {
    return this.establishmentRepository.findOneBy({ id });
  }

  async findOneByCnpj(cnpj: string): Promise<EstablishmentEntity | null> {
    return this.establishmentRepository.findOneBy({ cnpj });
  }

  async updateOne(newEstablishment: EstablishmentEntity): Promise<any> {
    return this.establishmentRepository.save({
      id: newEstablishment.id,
      ...newEstablishment,
    });
  }

  async removeOne(id: string): Promise<void> {
    await this.establishmentRepository.update(
      { id },
      { disabledAt: new Date() },
    );
  }
}
