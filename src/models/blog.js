const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,

    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
}
)

const Blog = mongoose.model('Blogs', blogSchema)



module.exports = Blog;