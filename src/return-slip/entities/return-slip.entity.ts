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


export class ReturnSlip {
    
}
