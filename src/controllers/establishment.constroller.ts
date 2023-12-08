import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EstablishmentService } from '../services/establishment.service';
import { EstablishmentEntity } from '../entities/establishment.entity';
import { CreateEstablishmentBody } from 'src/dtos/create-establishment-body';
import { UpdateEstablishmentBody } from 'src/dtos/update-establishment-body';

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  async createEstablishment(
    @Body() body: CreateEstablishmentBody,
  ): Promise<EstablishmentEntity> {
    const { name, cnpj, address, telephone, spaceForMotocycles, spaceForCar } =
      body;

    const establishment = await this.establishmentService.findOneByCnpj(cnpj);

    if (establishment) {
      throw new Error('Estabelecimento ja existe');
    }

    const establishmentCreated = await this.establishmentService.created({
      name,
      cnpj,
      address,
      telephone,
      spaceForMotocycles,
      spaceForCar,
    });

    return establishmentCreated;
  }

  @Get()
  async getAllEstablishment(): Promise<EstablishmentEntity[]> {
    const establishments = await this.establishmentService.findAll();

    return establishments;
  }

  @Get(':id')
  async getOneEstablishment(
    @Param('id') id: string,
  ): Promise<EstablishmentEntity> {
    const establishments = await this.establishmentService.findOneById(id);

    return establishments;
  }

  @Put(':id')
  async updateEstablishment(
    @Body() body: UpdateEstablishmentBody,
    @Param('id') id: string,
  ): Promise<void> {
    const establishment = body;

    await this.establishmentService.updateOne({ id, ...establishment });

    return;
  }

  @Delete(':id')
  async deleteEstablishment(@Param('id') id: string): Promise<void> {
    await this.establishmentService.removeOne(id);

    return;
  }
}
