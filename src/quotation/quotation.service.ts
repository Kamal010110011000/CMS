import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { Quotation } from './entities/quotation.entity';

@Injectable()
export class QuotationService {

  constructor( @InjectModel('Quotation') private readonly quotationModel: Model<Quotation>,){}

  public async create(createQuotationDto: CreateQuotationDto) {
    const response = await this.quotationModel.create(createQuotationDto);
    if (response._id) {
      return {response_code: HttpStatus.CREATED, response_data: 'quotation saved successfully.'};
    } else {
      return {response_code: HttpStatus.BAD_REQUEST, response_data: 'quotation not save bill'};
    }
  }

  public async findAll() {
    const quotations = await this.quotationModel.find();
    return {response_code: HttpStatus.OK, response_data: quotations};
    
  }

  public async findOne(id: string) {
    const quotation = await this.quotationModel.findById(id);
    return {response_code: HttpStatus.OK, response_data: quotation};
  }

  public async update(id: string, updateQuotationDto: CreateQuotationDto) {
    const quotations = await this.quotationModel.findByIdAndUpdate(id, updateQuotationDto);
    return {response_code: HttpStatus.OK, response_data: "quotation updated successfully"};
  }

  public async remove(id: string) {
    const response = await this.quotationModel.findByIdAndDelete(id);
    return { response_code: HttpStatus.OK, response_data: "qutation deleted successfully"};
  }
}
