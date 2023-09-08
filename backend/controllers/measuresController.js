import asyncHandler from '../middleware/asyncHandler.js';
import Measure from '../models/Measure.js';

// @desc    Fetch all measures
// @route   GET /api/measures
// @access  Public
export const getMeasures = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const measures = await Measure.find({ ...keyword });

  res.json({ measures });
});

// @desc    Fetch single measure
// @route   GET /api/measures/:id
// @access  Public
export const getMeasureById = asyncHandler(async (req, res) => {
  const measure = await Measure.findById(req.params.id);

  if (measure) {
    return res.json(measure);
  } else {
    res.status(404);
    throw new Error('Measure not found');
  }
});

// @desc    Create a measure
// @route   POST /api/measures
// @access  Private/Admin
export const createMeasure = asyncHandler(async (req, res) => {
  const { name, diminutive } = req.body;

  const newMeasure = new Measure({
    name,
    diminutive,
  });

  const createdMeasure = await newMeasure.save();
  res.status(201).json(createdMeasure);
});

// @desc    Update a measure
// @route   PUT /api/measures/:id
// @access  Private/Admin
export const updateMeasure = asyncHandler(async (req, res) => {
  const { name, diminutive } = req.body;

  const measure = await Measure.findById(req.params.id);

  if (measure) {
    measure.name = name || measure.name;
    measure.diminutive = diminutive || measure.diminutive;

    const updatedMeasure = await measure.save();
    res.json(updatedMeasure);
  } else {
    res.status(404);
    throw new Error('Measure not found');
  }
});

// @desc    Delete a measure
// @route   DELETE /api/measure/:id
// @access  Private/Admin
export const deleteMeasure = asyncHandler(async (req, res) => {
  const measure = await Measure.findById(req.params.id);

  if (measure) {
    await Measure.deleteOne({ _id: measure._id });
    res.json({ message: `Measure ${measure.name} removed` });
  } else {
    res.status(404);
    throw new Error('Measure not found');
  }
});
