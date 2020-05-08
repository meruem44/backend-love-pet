import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    url_id: {
        type: mongoose.Types.ObjectId,
        ref: 'FilePerfil'
    },
    address_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Address'
    },
    cpf: String
});

export default model('User', UserSchema);