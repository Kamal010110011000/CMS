import { Type } from "class-transformer";
import { ArrayMinSize, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class SupplyDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    
    @IsOptional()
    estimate: number;
    
    @IsOptional()
    criteria: string;

    @IsOptional()
    duedate: Date;
}
export class CreateQuotationDto {

    @IsOptional()
    notice: string;

    @IsOptional()
    receiver: string;

    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => SupplyDto)
    supply: SupplyDto[];
}

