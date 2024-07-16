import mongoose from "mongoose";

const Schema=mongoose.Schema;

const FinancialRecordSchema = new Schema({
    userId:{type: String, required: true},
    date:{type: String, required: true},
    description:{type: String, required: true},
    amount:{type: Number, required: true},
    category:{type: String, required: true},
    paymentMethod:{type: String, required: true}
});

const FinancialRecordModel = mongoose.model('FinancialRecord',FinancialRecordSchema)

export default FinancialRecordModel;