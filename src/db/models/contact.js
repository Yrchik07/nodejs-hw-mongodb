import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: false
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        required: true,
        default: 'personal'
    },
    createdAt: {
        timestamps: true
    },
    updatedAt: {
        timestamps: true
    }
});

export const Contact = model('Contacts', contactSchema);
