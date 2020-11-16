import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    // finding smt inside of the model takes time, means it is a asynchronous action.
    //so we have to add await, therefore we have to make this function async

    res.status(200).json(postMessages);
    //200 means everything went ok, 

  } catch (error) {
    res.status(404).json({ message: error.message});
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  // turn the body info sent from front-end into a post variable.
  //in next line, we create a newPost based on the info we got.

  const newPost = new PostMessage(post);
  
  try {
    await newPost.save();

    res.status(201).json(newPost);

  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id');
    
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });
    
  res.json(updatedPost);
}
  
  export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully'});
  }

  export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
  }
