import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Bill, BillDto } from './bill.model';
import { BillService } from './bill.service';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  create(@Body() bill: BillDto) {
    return this.billService.create(bill);
  }

  @Get()
  findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(id);
  }

  @Get('/gst-return')
  getGstReturn(){
    return this.billService.gstReturn();
  }

  @Get('/sale')
  getSaleBill(){
    return this.billService.findSale();
  }

  @Get('/purchase')
  getPurchaseBill(){
    return this.billService.findPurchase();
  }

  @Get('/profit')
  getProfit(){
    return this.billService.profitOrLoss();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() bill: Bill) {
    return this.billService.update(id, bill);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(id);
  }
}
