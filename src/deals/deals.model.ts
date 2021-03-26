import * as mongoose from 'mongoose';
import {IsArray, IsDate, IsEmpty, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUrl, Max, Min} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export const DealsSchema = new mongoose.Schema({
   
    delaPercent: {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
    //Category or Product
    delalType:{
        type: String,
    },
    status: {
        type: Number,
        default: 1,
    }
}, {timestamps: true});

enum delalType {
    Category = 'Category',
    Product = 'Product'
}

export class DealsDTO {

    @IsOptional()
    _id: string;

    @IsNotEmpty()
    @ApiModelProperty()
    delaPercent: number;

    @IsNotEmpty()
    @IsEnum(delalType, {message: 'Enter a valid type'})
    @ApiModelProperty()
    delalType: string;

    @IsOptional()
    @ApiModelProperty()
    category: string;

    @IsOptional()
    @ApiModelProperty()
    product: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    @ApiModelProperty()
    status: number;
}

export class DealsStatusDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1)
    @ApiModelProperty()
    status: number;

}


    // @IsOptional()
    // @ApiModelProperty()
    // user: string;