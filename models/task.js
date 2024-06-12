const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = ({
    taskName: { type: String, },
    description: { type: String, },
    status:{type:String,
        enum:["NEW","COMPLETED","IN PROGRESS"],
        default:"NEW"   
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Tasks', TaskSchema)
