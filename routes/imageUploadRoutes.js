const express = require('express');
const router = express.Router();
const imageUploadController = require('../controllers/imageUploadController')


router.post('/api/upload', imageUploadController.uploadImage);

router.get('/api/upload', imageUploadController.getAllImages);

router.get('/api/upload/:id', imageUploadController.getImageById);

module.exports = router;
