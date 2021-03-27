import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReturnSlip, ReturnSlipDto } from './return-slip.model';

@Injectable()
export class ReturnSlipService {

  constructor( @InjectModel('ReturnSlip') private readonly returnSlipModel: Model<ReturnSlip>,){}

  public async create(returnSlipDto: ReturnSlipDto) {
    const response = await this.returnSlipModel.create(returnSlipDto);
    if (response._id) {
      return {response_code: HttpStatus.CREATED, response_data: 'bill saved successfully.'};
    } else {
      return {response_code: HttpStatus.BAD_REQUEST, response_data: 'Could not save bill'};
    }
  }

  public async findAll() {
    const return_slips = await this.returnSlipModel.find();
    return {response_code: HttpStatus.OK, response_data: return_slips};
  }

  public async findOne(id: string) {
    const return_slip = await this.returnSlipModel.findById(id);
    return {response_code: HttpStatus.OK, response_data: return_slip};
  }

  public async update(id: string, returnSlipDto: ReturnSlipDto) {
    const response = await this.returnSlipModel.findByIdAndUpdate(id, returnSlipDto);
    return {response_code: HttpStatus.OK, response_data: "return slip data updated"};
  }

  public async remove(id: string) {
    const response = await this.returnSlipModel.findByIdAndDelete(id);
    return {response_code: HttpStatus.OK, response_data: "return slip deleted successfully"}
  }
}
