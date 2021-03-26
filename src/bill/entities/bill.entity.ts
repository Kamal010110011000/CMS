import * as mongoose from 'mongoose';

export const BillSchema = new mongoose.Schema({
    customer: {
        type: String
    },
    items:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },
            batch_id: String,
            quantity: Number,
            free: Number,
            rate: Number,
            discountPercent: Number,
            discountAmount: Number,
            gstPercent: Number,
            gstAmount: Number,
            total: Number,
        }
    ],
    expiry_date: Date,
    additional_charges: [{
        type: String,
        amount: Number
    }],
    status: {
        type: String,
        enum:['bill', 'challan']
    },
    paymentType: {
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

export class Bill {}
