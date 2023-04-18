const Comment = require('../models/comment');

// GET /comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /comments/:id
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /comments
exports.createComment = async (req, res) => {
  const comment = new Comment({
    product: req.body.product,
    user: req.body.user,
    rating: req.body.rating,
    images: req.body.images,
    //images: Array.isArray(req.body.images) ? req.body.images : [req.body.images], 
    text: req.body.text
  });
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH /comments/:id
// exports.updateComment = async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);
//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }
//     comment.rating = req.body.rating;
//     comment.images = Array.isArray(req.body.images) ? req.body.images : [req.body.images]; // Check if image is an array, if not wrap it in an array
//     comment.text = req.body.text;
//     const updatedComment = await comment.save();
//     res.json(updatedComment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }


    // loop through the request body and update any attributes that are present
    for (let [key, value] of Object.entries(req.body)) {
      if (comment[key] !== undefined) {
        comment[key] = value;
      }
    }
    
    
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /comments/:id
exports.deleteComment = async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // GET /comments/:userId/:productId
  exports.getCommentByUserAndProduct = async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const comment = await Comment.findOne({ user: userId, product: productId });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

    // GET /comments/product/:productId
    // exports.getCommentsByProduct = async (req, res) => {
    //   try {
    //     const comment = await Comment.find({ product: req.params.productId});
    //     if (!comment || comment.length === 0) {
    //       return res.status(404).json({ message: 'Comment not found for this product' });
    //     }
    //     res.status(200).json(comment);
    //   } catch (error) {
    //     res.status(500).json({ message: error.message });
    //   }
    // };
    exports.getCommentsByProduct = async (req, res) => {
      try {
        const comments = await Comment.find({ product: req.params.productId }).populate('user', 'username');
        if (!comments || comments.length === 0) {
          return res.status(404).json({ message: 'Comment not found for this product' });
        }
        const commentsWithUsername = comments.map(comment => ({
          ...comment._doc,
          username: comment.user.username
        }));
        res.status(200).json(commentsWithUsername);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    