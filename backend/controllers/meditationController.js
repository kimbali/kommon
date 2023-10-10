import asyncHandler from '../middleware/asyncHandler.js';
import Meditation from '../models/Meditation.js';

// @desc    Fetch all meditations
// @route   GET /api/meditations
// @access  Public
export const getMeditations = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const meditations = await Meditation.find({ ...keyword });

  res.json({ meditations });
});

// @desc    Fetch single meditation
// @route   GET /api/meditations/:id
// @access  Public
export const getMeditationById = asyncHandler(async (req, res) => {
  const meditation = await Meditation.findById(req.params.id);

  if (meditation) {
    return res.json(meditation);
  } else {
    res.status(404);
    throw new Error('Meditation not found');
  }
});

// @desc    Create a meditation
// @route   POST /api/meditations
// @access  Private/Admin
export const createMeditation = asyncHandler(async (req, res) => {
  const { title, description, minutes, image, link, level } = req.body;

  const newMeditation = new Meditation({
    title,
    description,
    minutes,
    image,
    link,
    level,
  });

  const createdMeditation = await newMeditation.save();
  res.status(201).json(createdMeditation);
});

// @desc    Update a meditation
// @route   PUT /api/meditations/:id
// @access  Private/Admin
export const updateMeditation = asyncHandler(async (req, res) => {
  const { title, description, minutes, image, link, level } = req.body;

  const meditation = await Meditation.findById(req.params.id);

  if (meditation) {
    meditation.title = title || meditation.title;
    meditation.description = description || meditation.description;
    meditation.minutes = minutes || meditation.minutes;
    meditation.image = image || meditation.image;
    meditation.link = link || meditation.link;
    meditation.level = level || meditation.level;

    const updatedMeditation = await meditation.save();
    res.json(updatedMeditation);
  } else {
    res.status(404);
    throw new Error('Meditation not found');
  }
});

// @desc    Delete a meditation
// @route   DELETE /api/meditation/:id
// @access  Private/Admin
export const deleteMeditation = asyncHandler(async (req, res) => {
  const meditation = await Meditation.findById(req.params.id);

  if (meditation) {
    await Meditation.deleteOne({ _id: meditation._id });
    res.json({ message: `Meditation ${meditation.title} removed` });
  } else {
    res.status(404);
    throw new Error('Meditation not found');
  }
});
