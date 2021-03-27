import { Type } from 'class-transformer/decorators';
import { IsNotEmpty, ValidateNested, ArrayMinSize, IsOptional, IsIn } from 'class-validator';
import * as mongoose from 'mongoose';

export const ReturnSlipSchema = new mongoose.Schema({
    type:{
        type: String,
        enum: ['sale', 'puchase']
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
        },
        batch_id: String,
        quantity: Number,
        return_price: Number,
    }],
    remark: {
        type: String
    },
},
{timestamps: true});

export class Item{
    productId: string;
    batch_id: string;
    quantity: number;
    return_price: number;
}

export class ItemDto{

    @IsNotEmpty()
    productId: string;

    @IsOptional()
    batch_id: string;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    return_price: number;
}


export interface ReturnSlip extends mongoose.Document{
    id: string;
    type: string;
    items: Item[];
    remark: string;
}

export class ReturnSlipDto{
    @IsOptional()
    _id: string;

    @IsNotEmpty()
    @IsIn(['sale', 'purchase'])
    type: string;

    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(()=> ItemDto)
    items: ItemDto[];

    @IsOptional()
    remark: string;

}




