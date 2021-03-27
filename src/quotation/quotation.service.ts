import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { Quotation } from './entities/quotation.entity';

@Injectable()
export class QuotationService {

  constructor( @InjectModel('ReturnSlip') private readonly quotationModel: Model<Quotation>,){}

  create(createQuotationDto: CreateQuotationDto) {
    return 'This action adds a new quotation';
  }

  findAll() {
    return `This action returns all quotation`;
  }

  findOne(id: string) {
    return `This action returns a #${id} quotation`;
  }

  update(id: string, updateQuotationDto: CreateQuotationDto) {
    return `This action updates a #${id} quotation`;
  }

  remove(id: string) {
    return `This action removes a #${id} quotation`;
  }
}
