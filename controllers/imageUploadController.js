const multer = require('multer');
const Image = require('../models/image');

//const upload = multer({ dest: 'uploads/' });

const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

exports.uploadImage = async (req, res) => {
  upload.array('images', 1)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send('Error uploading files.');
    } else if (err) {
      return res.status(500).send('Server error.');
    }

    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    } else {
      res.send(req.files);
      console.log("*************");
      console.log(req.files);
      console.log("file uploaded");
    }

    // const images = req.files.map((file) => {
    //   return {
    //     filename: file.filename,
    //     path: file.path,
    //     mimetype: file.mimetype,
    //     size: file.size,
    //   };
    // });

    // Use Promise.all to save all the images to the database
    // try {
    //   const savedImages = await Promise.all(images.map((image) => {
    //     return new Image(image).save();
    //   }));
    //   console.log(`${savedImages.length} images saved to the database`);
    //   return res.status(200).json(savedImages);
    // } catch (err) {
    //   console.log(err);
    //   return res.status(500).send('Server error.');
    // }
  });
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    return res.status(200).json(images);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error.');
  }
};

exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).send('Image not found.');
    }
    return res.status(200).json(image);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error.');
  }
};
