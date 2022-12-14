// Require Mongoos and Moment
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// ReactionSchema
const ReactionSchema = new Schema(
    {
        // set custome id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createAtVal) => moment(createAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
        },
        {
        toJSON: {
            getters: true
        }
        }
);

//ThoughtsSchema
const ThoughtsSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createAtVal) => moment(createAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    // use ReactionSchema to validate data
    reactions: [ReactionSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
    }
)

const Thought = model('Thought', ThoughtsSchema);

    // get total count of friends on retrieval
    ThoughtsSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
    });

module.exports = Thought;