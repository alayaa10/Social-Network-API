const { Schema, model, Types } = require('mongoose');

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // using REGEX to validate correct email
            match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'
        ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// use this to get the total count of friends
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create the Users model using the users Schema
const Users = model('Users', UsersSchema);

module.exports = Users;