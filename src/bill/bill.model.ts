import { Optional } from '@nestjs/common';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
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
    
    @ApiModelProperty()
    @IsNotEmpty()
    productId: string;
    
    @IsOptional()
    batch_id: string;
    
    @ApiModelProperty()
    @IsNumber()
    quantity: number;

    @ApiModelProperty()
    @IsNumber()
    @IsOptional()
    free: number;

    @ApiModelProperty()
    @IsNumber()
    @IsNotEmpty()
    rate: number;

    @ApiModelPropertyOptional()
    @IsNumber()
    @IsOptional()
    discount_percent: number;

    @ApiModelPropertyOptional()
    @IsNumber()
    @IsOptional()
    cgst: number;

    @ApiModelPropertyOptional()
    @IsNumber()
    @IsOptional()
    sgst: number;

    @IsNumber()
    @ApiModelPropertyOptional()
    @IsOptional()
    igst: number;

    @IsNumber()
    @IsOptional()
    @ApiModelPropertyOptional()
    utgst: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiModelPropertyOptional()
    total: number;
}



export class AdditionalChargesDto{
    @IsNotEmpty()
    @ApiModelProperty()
    type: string;
    
    @IsNotEmpty()
    @ApiModelProperty()
    @IsNumber()
    amount: number;
}


export class TotalDto{

    @IsOptional()
    @ApiModelPropertyOptional()
    totalGst: number;

    @IsNotEmpty()
    @ApiModelProperty()
    @IsNumber()
    totalproductAmount: number;

    @IsOptional()
    @ApiModelPropertyOptional()
    totalAddCharge: number;

    @IsNotEmpty()
    @ApiModelProperty()
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
    @ApiModelProperty()
    customer: string;

    @ApiModelProperty()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(()=> ItemDto)
    items: ItemDto[];

    @IsOptional()
    @ApiModelProperty()
    expiryDate: Date;

    @ApiModelProperty()
    @ValidateNested({each: true})
    @ArrayMinSize(0)
    @Type(()=> AdditionalChargesDto)
    additional_charges: AdditionalChargesDto[];

    @ApiModelProperty()
    @IsNotEmpty()
    @IsIn(['bill', 'challan'])
    status: string;
    
    @ApiModelProperty()
    @IsNotEmpty()
    @IsIn(['card', 'cash', 'upi', 'cheque', 'demand-draft', 'credit'])
    payment_type: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsIn(['sale', 'purchase'])
    type: string

    @ApiModelProperty()
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

    @ApiModelProperty()
    @IsNotEmpty()
    productId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    buyingPrice: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    sellingPrice: number
}

export class GST{
    
}


