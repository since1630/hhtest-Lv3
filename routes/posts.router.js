const express = require('express');
const router = express.Router();
const { Posts } = require('../models');

const createNewPost = async (req, res) => {
  /** (구현) **/
  const { title, content } = req.body;
  const createdPost = await Posts.create({ title, content });

  const newCreatedPost = {
    id: createdPost.id,
    title: createdPost.title,
    content: createdPost.content,
  };
  return res.status(201).send(newCreatedPost);
};

const getAllPosts = async (req, res) => {
  /** (구현) **/

  const posts = await Posts.findAll({
    attributes: ['id', 'title', 'content'],
  });
  return res.status(200).send(posts);
};

const updatePost = async (req, res) => {
  /** (구현) **/
  const { title, content } = req.body;
  const { postId } = req.params;
  await Posts.update({ title, content }, { where: { id: postId } });
  const updatedPost = await Posts.findOne({
    attributes: ['id', 'title', 'content'],
    where: { id: postId },
  });

  return res.status(200).send(updatedPost);
};

const deletePostById = async (req, res) => {
  /** (구현) **/
  const { postId } = req.params;
  const checkPostDelete = await Posts.destroy({
    where: { id: postId },
  });
  return res.status(200).json({ message: 'success' });
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

module.exports = router;
