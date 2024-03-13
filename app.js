const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/imageUploadRoutes');
const guestCartRoutes = require('./routes/guestCartRouter');


const app = express();
const port = process.env.PORT || 8081;
const dbUrl = 'mongodb://0.0.0.0:27017/WebTech';

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(userRoutes);
app.use(productRoutes);
app.use(commentRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(uploadRoutes);
app.use(guestCartRoutes);


app.get('/image/:id', (req, res) => {
  const id = req.params.id;
  const imagePath = __dirname + '/uploads/' + id + '.png';
  res.sendFile(imagePath);
});

//Connect to datatbase
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  })
  .catch(error => {
    console.log(`Unable to connect to the database: ${error}`);
  });