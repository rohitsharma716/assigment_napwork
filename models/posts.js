const  mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
      },
      postName: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      uploadTime: {
        type: Date,
        default: Date.now
      },
      tags: {
        type: [String],
        default: []
      },
      imageUrl: {
        type: String,
      },
})


const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts;