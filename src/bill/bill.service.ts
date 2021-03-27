import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill, BillDto } from './bill.model';

@Injectable()
export class BillService {

  constructor( @InjectModel('Bill') private readonly billModel: Model<Bill>,){}

  public async create(createBillDto: BillDto) {
    console.log("create bill called!");
    const response = await this.billModel.create(createBillDto);
    if (response._id) {
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
}
