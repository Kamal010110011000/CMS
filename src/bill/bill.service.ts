import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'request';
import { Bill, BillDto, BillSchema, CreateRevenueDto, Revenue } from './bill.model';

@Injectable()
export class BillService {

  constructor( @InjectModel('Bill') private readonly billModel: Model<Bill>, @InjectModel('Revenue') private readonly revenueModel: Model<Revenue>, @InjectModel('Products') private readonly productModel: Model<any>){}

  public async create(createBillDto: BillDto) {
    console.log("create bill called!");
    const response = await this.billModel.create(createBillDto);
    if (response._id) {
      if(response.type=='sale'){
        for(let item of response.items){
          const product = await this.productModel.findById(item.productId).select('price');
          const rev = new CreateRevenueDto();
          rev.productId = item.productId;
          rev.quantity = item.quantity;
          rev.buyingPrice = product.price;
          rev.sellingPrice = item.rate;
          const revenue = await this.revenueModel.create(rev);
        }
      }
      return {response_code: HttpStatus.CREATED, response_data: 'bill saved successfully.'};
    } else {
      return {response_code: HttpStatus.BAD_REQUEST, response_data: 'Could not save bill'};
    }
  }

  public async findAll() {
    const bills = await this.billModel.find();
    return {response_code: HttpStatus.OK, response_data: bills};
  }

  public async findOne(id: string) {
    const bill = await this.billModel.findById(id);
    return {response_code: HttpStatus.OK, response_data: bill};
    
  }

  public async update(id: string, updateBillDto: Bill) {
    const response = await this.billModel.findByIdAndUpdate(id, updateBillDto);
    return {response_code: HttpStatus.OK, response_data: "bill updated successfully"};
  }

  public async remove(id: String) {
    const response = await this.billModel.findByIdAndDelete(id);
    return {response_code: HttpStatus.OK, response_data: "bill deleted successfully"};
  }

  public async findSale(){
    const sales = await this.billModel.find({type: 'sale'});
    return {response_code: HttpStatus.OK, response_data: sales};
  }

  public async findPurchase(){
    const purchases = await this.billModel.find({type: 'purchase'});
    return {response_code: HttpStatus.OK, response_data: purchases};
  }

  public async findChallan(){
    const challan = await this.billModel.find({status: 'challan'});
    return {response_code: HttpStatus.OK, response_data: challan};
  }

  public async findBill(){
    const bills = await this.billModel.find({status: 'bill'});
    return {response_code: HttpStatus.OK, response_data: bills};
  }

  public async profitOrLossDaily(date: Date){
    var startOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var endOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1);
    var revenue = await this.revenueModel.find({ $and : [{created_on: {$gte: startOfToday}}, {create_on: {$lt: endOfToday}}]});
    return this.calculate(revenue);
  }

  private calculate(revenue: Revenue[]){
    var sold = 0;
    var bought = 0;
    for(let item of revenue){
      sold+=item.sellingPrice;
      bought+=item.buyingPrice;
    }
    var status = sold-bought;
    return {response_code: HttpStatus.OK, response_data: { items: revenue, status: status, sp: sold, cp: bought, }}
  }

  public async profitOrLossMonthly(month: number, year: number){
    var startOfMonth = new Date(year, month);
    var endOfMonth = new Date(year, month+1);
    var revenue = await this.revenueModel.find({ $and: [{created_on: {$gte: startOfMonth}},{created_on:{$lt: endOfMonth}}]});
    return this.calculate(revenue);
  }

  public async profitOrLoss(){
    const revenue = await this.revenueModel.find();
    return this.calculate(revenue);
  }

  public async gstReturnMonthly(month: number, year: number){
    var startOfMonth = new Date(year, month);
    var endOfMonth = new Date(year, month+1);
    const gst = await this.billModel.find({ $and: [{created_on: {$get: startOfMonth}}, {created_on:{$lt: endOfMonth}}]}) as Array<Bill>;
    return this.calculateGST(gst);
  }

  private calculateGST(gst: Bill[]){
    var collectedGST = 0;
    var payedGST = 0;
    for(let item of gst){
      if(item.type == 'sale'){
        collectedGST+=item.total.totalGst;
      }else{
        payedGST+=item.total.totalGst;
      }
    }

    var response = {
      collected_gst: collectedGST,
      payed_gst : payedGST,
    }
    return {response_code: HttpStatus.OK, response_data: response};
  }

  public async getGstReturnYearly(year: number){
    var startOfYear = new Date(year);
    var endOfYear = new Date(year+1);
    const gst = await this.billModel.find({ $and: [{created_on: {$get: startOfYear}}, {created_on:{$lt: endOfYear}}]}) as Array<Bill>;
    return this.calculateGST(gst);
  }

  public async sendSms(to: number){

    const baseurl = 'https://www.fast2sms.com/dev/bulkV2?';
    var text = "hello";
    request(
      `${baseurl}authorization=${process.env.Fast2SMS_API}&message=${text}&language=english&route=q&numbers=${to}`,
      { json: true },
      (err, data, body) => {
        if (err) return {response_code: HttpStatus.BAD_REQUEST, response_data: "message not sent"};
        console.log(data);
        return {response_code: HttpStatus.OK, response_data: "message sent"};
        
      }
    );
  }

  public async productMargin(name: string){
    const margin = await this.productModel.find({slug: name}).select('title description price cost_price user').populate({path:'users', select: 'firstname secondName'});
    return {response_code: HttpStatus.OK, response_data: margin};
  }

}
