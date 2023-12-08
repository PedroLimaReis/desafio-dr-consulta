import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentService } from '../services/establishment.service';
import { EstablishmentController } from '../controllers/establishment.constroller';
import { EstablishmentEntity } from '../entities/establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstablishmentEntity])],
  providers: [EstablishmentService],
  controllers: [EstablishmentController],
})
export class EstablishmentModule {}
