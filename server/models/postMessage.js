import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {type: String},
  message: {type: String},
  creator: {type: String},
  tags: [String],
  selectedFile: {type: String},
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date, 
    default: new Date() 
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;