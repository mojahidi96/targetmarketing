const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Create Schema
const PostSchema = new schema({
  user: {
    type: schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
