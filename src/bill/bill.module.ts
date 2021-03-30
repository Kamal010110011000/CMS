import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema, RevenueSchema } from './bill.model';
import { ProductsSchema } from 'src/products/products.model';

@Module({
  imports:[ MongooseModule.forFeature([{name: 'Bill', schema: BillSchema},{name: 'Revenue', schema: RevenueSchema},{name: 'Products', schema: ProductsSchema}])],
  controllers: [BillController],
  providers: [BillService]
})
export class BillModule {}
