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

  @Get('/gst-return/:year')
  getGstReturnYear(@Param('year') year: number){
    return this.billService.getGstReturnYearly(year);
  }

  @Get('/gst-return/:month/:year')
  getGstReturn(@Param('month') month: number, @Param('year') year: number){
    return this.billService.gstReturnMonthly(month, year);
  }

  @Get('/sale')
  getSaleBill(){
    return this.billService.findSale();
  }

  @Get('/purchase')
  getPurchaseBill(){
    return this.billService.findPurchase();
  }

  @Get('/profit-loss')
  getProfit(){
    return this.billService.profitOrLoss();
  }

  @Get('/profit-loss/today')
  getTodayProfitLoss(){
    var date = new Date(Date.now());
    return this.billService.profitOrLossDaily(date);
  }

  @Get('/profit-loss/:date')
  getProfitLossDaily(@Param('date') date: string){
    var d = new Date(date);
    return this.billService.profitOrLossDaily(d);
  }

  @Get('/profit-loss/:month/:year')
  getProfitLossMonth(@Param('month') month: number, @Param('year') year: number){
    return this.billService.profitOrLossMonthly(month, year);
  }

  @Get('/send-reminder/:number')
  sendReminder(@Param('number') num: number){
    return this.billService.sendSms(num);
  }

  @Get('/margin/:product')
  getMargin(@Param('product') prod: string){
    return this.billService.productMargin(prod);
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
