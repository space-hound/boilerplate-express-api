import mongoose from 'mongoose';

import TokenEnums from './token.enums';

/**
 * Token Schema
 */
const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: TokenEnums.TOKENS_ARRAY,
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Token Schema Configurations
 */
tokenSchema.set('toJSON', { virtuals: true });

/**
 * Token Model
 */
const TokenModel = mongoose.model('Token', tokenSchema);

export default TokenModel;
