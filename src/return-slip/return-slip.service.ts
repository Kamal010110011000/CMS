import { Injectable } from '@nestjs/common';
import { CreateReturnSlipDto } from './dto/create-return-slip.dto';
import { UpdateReturnSlipDto } from './dto/update-return-slip.dto';

@Injectable()
export class ReturnSlipService {
  create(createReturnSlipDto: CreateReturnSlipDto) {
    return 'This action adds a new returnSlip';
  }

  findAll() {
    return `This action returns all returnSlip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} returnSlip`;
  }

  update(id: number, updateReturnSlipDto: UpdateReturnSlipDto) {
    return `This action updates a #${id} returnSlip`;
  }

  remove(id: number) {
    return `This action removes a #${id} returnSlip`;
  }
}
