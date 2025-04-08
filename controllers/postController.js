const Post = require('../models/Post');

// Obtener todos los posts
exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

// Crear un nuevo post
exports.createPost = async (req, res) => {
  const { id, userId, title, body } = req.body;

  const existing = await Post.findOne({ id });
  if (existing) return res.status(400).json({ message: 'ID already exists' });

  const post = new Post({ id, userId, title, body });
  await post.save();
  res.status(201).json(post);
};

// Actualizar un post por ID lógico
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const updated = await Post.findOneAndUpdate({ id: parseInt(id) }, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Post not found' });
  res.json(updated);
};

// Eliminar un post por ID lógico
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const deleted = await Post.findOneAndDelete({ id: parseInt(id) });
  if (!deleted) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Deleted successfully' });
};
