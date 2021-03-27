import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema } from './bill.model';

@Module({
  imports:[ MongooseModule.forFeature([{name: 'Bill', schema: BillSchema}])],
  controllers: [BillController],
  providers: [BillService]
})
export class BillModule {}
