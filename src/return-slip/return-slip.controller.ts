import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnSlipService } from './return-slip.service';
import { CreateReturnSlipDto } from './dto/create-return-slip.dto';
import { UpdateReturnSlipDto } from './dto/update-return-slip.dto';

@Controller('return-slip')
export class ReturnSlipController {
  constructor(private readonly returnSlipService: ReturnSlipService) {}

  @Post()
  create(@Body() createReturnSlipDto: CreateReturnSlipDto) {
    return this.returnSlipService.create(createReturnSlipDto);
  }

  @Get()
  findAll() {
    return this.returnSlipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnSlipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnSlipDto: UpdateReturnSlipDto) {
    return this.returnSlipService.update(+id, updateReturnSlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnSlipService.remove(+id);
  }
}
