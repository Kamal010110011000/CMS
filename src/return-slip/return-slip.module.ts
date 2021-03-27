import { Module } from '@nestjs/common';
import { ReturnSlipService } from './return-slip.service';
import { ReturnSlipController } from './return-slip.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReturnSlipSchema } from './return-slip.model';

@Module({
  imports:[MongooseModule.forFeature([{name:"ReturnSlip", schema: ReturnSlipSchema}])],
  controllers: [ReturnSlipController],
  providers: [ReturnSlipService]
})
export class ReturnSlipModule {}
