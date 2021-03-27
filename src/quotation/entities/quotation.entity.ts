import * as mongoose  from "mongoose";


export const QuotationSchema = new mongoose.Schema({
    notice:String,
    receiver: String,
    supply: [{
        name: String,
        quantity: Number,
        estimate: Number,
        criteria: Number,
        duedate: Date,
    }]
}, {timestamps: true});

export class Supply{
    name: string;
    quantity: number;
    estimate: number;
    criteria: string;
    duedate: Date;
}
export interface Quotation extends mongoose.Document {
    notice: string;
    receiver: string;
    supply: Supply[];
}
