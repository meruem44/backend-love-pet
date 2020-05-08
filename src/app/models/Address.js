import mongoose, { model, Schema } from 'mongoose';

const AddressSchema = new Schema({
    zipCode: String,
    neighborhood: String,
    street: String,
    number: String,
    city: String,
    uf: String
});

export default model('Address', AddressSchema);