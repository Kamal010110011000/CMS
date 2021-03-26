import { ApiModelProperty } from "@nestjs/swagger";
import { Type } from "class-transformer/decorators";
import { ArrayMinSize, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";

export class CreateBillDto {
    @IsOptional()
    _id: string;
    
    @IsNotEmpty()
    @ApiModelProperty()
    customer: string;

    @ApiModelProperty()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => ItemsDTO)
    items: ItemsDTO[];

    @ApiModelProperty()
    expiry_date: Date;

}

export class Items{
    product: String;
    batch_id: String;
    quantity: Number;
    free: Number;
    rate: Number;
    discountPercent: Number;
    discountAmount: Number;
    gstPercent: Number;
    gstAmount: Number;
    total: Number;
}

export class ItemsDTO{

}
