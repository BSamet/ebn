import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';

@Controller('historique')
export class HistoriqueController {
  constructor(private readonly historiqueService: HistoriqueService) {}

  @Post()
  create(@Body() createHistoriqueDto: CreateHistoriqueDto) {
    return this.historiqueService.create(createHistoriqueDto);
  }

  @Get()
  findAll() {
    return this.historiqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiqueService.findOne(+id);
  }

  @Get('customer/:id')
  findByClient(@Param('id') id: string) {
    return this.historiqueService.findByClient(+id);
  }

  @Get('/all/:pages')
  findAllHistoriquesPagination(
    @Param('pages') pages: number,
    @Query('take') take: number,
    @Query('orderBy') orderBy: string,
    @Query('nomCommercial') nomCommercial: string,
    @Query('typeAction') typeAction: string,
    @Query('typeDeDechet') typeDeDechet: string,
    @Query('dateStart') dateStart: Date,
    @Query('dateEnd') dateEnd: Date,
  ) {
    console.log(nomCommercial);
    console.log(dateStart);
    console.log(dateEnd);

    const takeForBuilder = take || 10;
    const pagesForBuilder = pages || 1;
    const skipForBuilder = takeForBuilder * (pagesForBuilder - 1);

    return this.historiqueService.findAllHistoriquesPagination(
      takeForBuilder,
      skipForBuilder,
      orderBy,
      nomCommercial,
      typeAction,
      typeDeDechet,
      dateStart,
      dateEnd,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistoriqueDto: UpdateHistoriqueDto,
  ) {
    return this.historiqueService.update(+id, updateHistoriqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiqueService.remove(+id);
  }
}
