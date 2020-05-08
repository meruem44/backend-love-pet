import mongoose, { model, Schema } from 'mongoose';

const FileSchema = new Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

FileSchema.pre('save', function() {
    if (!this.url) {
        this.url = `https://localhost:3333/files/${this.key}`
    }
} );

export default model('FilePerfil', FileSchema);