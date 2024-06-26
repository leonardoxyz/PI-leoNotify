const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = model('User', userSchema);
