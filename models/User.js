const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        nique: true,
        validate: {
            validator: function(value) {
                return /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z]{2,15})$/.test(value);
            },
            message: input => `${input.value} is not a valid email address. Try again.`
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

userSchema.virtudal('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;