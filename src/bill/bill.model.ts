import { Type } from 'class-transformer';
import { ArrayMinSize, IsDate, IsIn, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import * as mongoose from 'mongoose';

export const BillSchema = new mongoose.Schema({
    customer: {
        type: String
    },
    slug:{
        type: String,
    },
    items:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            },
            batch_id: String,
            quantity: Number,
            free: Number,
            rate: Number,
            discount_percent: Number,
            cgst: Number,
            sgst: Number,
            igst: Number,
            utgst: Number,
            total: Number,
        }
    ],
    expiry_date: Date,
    additional_charges: [{
        type: {type: String},
        amount: Number
    }],
    status: {
        type: String,
        enum:['bill', 'challan']
    },
    payment_type: {
        type: String,
        enum:['card', 'cash', 'upi', 'cheque', 'demand-draft', 'credit']
    },
    type:{
        type: String,
        enum:['sale', 'purchase']
    },
    total:{
        totalGst: Number,
        totalproductAmount: Number,
        totalAddCharge: Number,
        grandTotal: Number,
    }
},
{timestamps: true});

export class Item{
    productId : string;
    batch_id: string;
    quantity: number;
    free: number;
    rate: number;
    discount_percent: number;
    cgst: number;
    sgst: number;
    igst: number;
    utgst: number;
    total: number;
}

export class Total{
    totalGst: number;
    totalproductAmount: number;
    totalAddCharge: number;
    grandTotal: number;
}

export class AdditionalCharges{
    type: string;
    amount: number;
}


export class ItemDto{
    @IsNotEmpty()
    productId: string;
    
    @IsOptional()
    batch_id: string;
    
    @IsNumber()
    quantity: number;

    @IsNumber()
    @IsOptional()
    free: number;

    @IsNumber()
    @IsNotEmpty()
    rate: number;

    @IsNumber()
    @IsOptional()
    discount_percent: number;

    @IsNumber()
    @IsOptional()
    cgst: number;

    @IsNumber()
    @IsOptional()
    sgst: number;

    @IsNumber()
    @IsOptional()
    igst: number;

    @IsNumber()
    @IsOptional()
    utgst: number;

    @IsNumber()
    @IsNotEmpty()
    total: number;
}



export class AdditionalChargesDto{
    @IsNotEmpty()
    type: string;
    
    @IsNotEmpty()
    @IsNumber()
    amount: number;
}


export class TotalDto{

    @IsOptional()
    totalGst: number;

    @IsNotEmpty()
    @IsNumber()
    totalproductAmount: number;

    @IsOptional()
    totalAddCharge: number;

    @IsNotEmpty()
    @IsNumber()
    grandTotal: number;
}


export interface Bill extends mongoose.Document {
    id: string;
    customer: string;
    items: Item[];
    expiry_date: Date;
    additional_charges: AdditionalCharges[];
    status: string;
    payment_type: string;
    type: string;
    total: Total;
}

export class BillDto{

    @IsOptional()
    _is: string;

    @IsNotEmpty()
    customer: string;

    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(()=> ItemDto)
    items: ItemDto[];

    @IsOptional()
    expiryDate: Date;

    @ValidateNested({each: true})
    @ArrayMinSize(0)
    @Type(()=> AdditionalChargesDto)
    additional_charges: AdditionalChargesDto[];

    @IsNotEmpty()
    @IsIn(['bill', 'challan'])
    status: string;
    
    @IsNotEmpty()
    @IsIn(['card', 'cash', 'upi', 'cheque', 'demand-draft', 'credit'])
    payment_type: string;

    @IsNotEmpty()
    @IsIn(['sale', 'purchase'])
    type: string

    @ValidateNested({each: true})
    @Type(()=> TotalDto)
    total: TotalDto;
}

export const RevenueSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: Number,
    buyingPrice: Number,
    sellingPrice: Number,
},{timestamps: true});

export interface Revenue extends mongoose.Document {
    productId : String,
    quantity: number;
    buyingPrice: number;
    sellingPrice: number;
}

export class CreateRevenueDto {
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    buyingPrice: number;

    @IsNotEmpty()
    @IsNumber()
    sellingPrice: number
}

export class GST{
    
}


