import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnSlipDto } from './return-slip.model';
import { ReturnSlipService } from './return-slip.service';


@Controller('return-slip')
export class ReturnSlipController {
  constructor(private readonly returnSlipService: ReturnSlipService) {}

  @Post()
  create(@Body() createReturnSlipDto: ReturnSlipDto) {
    return this.returnSlipService.create(createReturnSlipDto);
  }

  @Get()
  findAll() {
    return this.returnSlipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnSlipService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnSlipDto: ReturnSlipDto) {
    return this.returnSlipService.update(id, updateReturnSlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnSlipService.remove(id);
  }
}
