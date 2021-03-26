import { Module } from '@nestjs/common';
import { SequenceService } from './sequence.service';
import {SequenceSchema} from './sequence.model';
import {MongooseModule} from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sequence', schema: SequenceSchema}])],
    providers: [SequenceService]
})
export class SequenceModule {}
