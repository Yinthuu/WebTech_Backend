const Product = require('../models/product');

// GET /products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /products
exports.createProduct = async (req, res) => {
  const product = new Product({
    title : req.body.title,
    description: req.body.description,
    image: req.body.image,
    pricing: req.body.pricing,
    shippingCost: req.body.shippingCost
  });

  

  try {
    const {description} = req.body;
    const existingProduct = await Product.findOne({ $or: [{ description }] });

    if (existingProduct) {
      return res.status(409).send('Product description already exists with');
    }

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//   const product = new Product({
//     description: req.body.description,
//     image: req.body.image,
//     pricing: req.body.pricing,
//     shippingCost: req.body.shippingCost
//   });
//   try {
//     const newProduct = await product.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// PATCH /products/:id
// exports.updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     product.title = req.body.title,
//     product.description = req.body.description;
//     product.image = req.body.image;
//     product.pricing = req.body.pricing;
//     product.shippingCost = req.body.shippingCost;
//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // loop through the request body and update any attributes that are present
    for (let [key, value] of Object.entries(req.body)) {
      if (product[key] !== undefined) {
        product[key] = value;
      }
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// DELETE /products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};