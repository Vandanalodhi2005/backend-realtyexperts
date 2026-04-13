const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { upload, cloudinary } = require('../config/cloudinary');
const { verifyAdminToken } = require('../middleware/auth');

// Get all gallery images
router.get('/', async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new gallery image (with optional file upload)
router.post('/', verifyAdminToken, upload.single('image'), async (req, res) => {
    try {
        let imageUrl = req.body.imageUrl;

        // If file is uploaded, send to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
                folder: 'gallery',
            });
            imageUrl = result.secure_url;
        }

        if (!imageUrl) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const galleryItem = new Gallery({
            imageUrl: imageUrl,
            title: req.body.title || 'Exquisite Space',
            category: req.body.category || 'General'
        });

        const newImage = await galleryItem.save();
        res.status(201).json(newImage);
    } catch (error) {
        console.error('Gallery upload error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Delete gallery image
router.delete('/:id', verifyAdminToken, async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Image not found' });
        }
        
        // Optionally delete from Cloudinary if needed
        // const publicId = item.imageUrl.split('/').pop().split('.')[0];
        // await cloudinary.uploader.destroy(`gallery/${publicId}`);

        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
