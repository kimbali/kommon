import asyncHandler from '../middleware/asyncHandler.js';
import Diet from '../models/Diet.js';

// @desc    Fetch all diets
// @route   GET /api/diets
// @access  Public
export const getDiets = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        isActive: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const diets = await Diet.find({ ...keyword });

  res.json({ diets });
});

// @desc    Fetch single diet
// @route   GET /api/diets/:id
// @access  Public
export const getDietById = asyncHandler(async (req, res) => {
  const diet = await Diet.findById(req.params.id);

  if (diet) {
    return res.json(diet);
  } else {
    res.status(404);
    throw new Error('Diet not found');
  }
});

// @desc    Create a diet
// @route   POST /api/diets
// @access  Private/Admin
export const createDiet = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body;

  const newDiet = new Diet({
    name,
    isActive,
  });

  const createdDiet = await newDiet.save();
  res.status(201).json(createdDiet);
});

// @desc    Update a diet
// @route   PUT /api/diets/:id
// @access  Private/Admin
export const updateDiet = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body;

  const diet = await Diet.findById(req.params.id);

  if (diet) {
    diet.name = name || diet.name;
    diet.isActive = isActive || diet.isActive;

    const updatedDiet = await diet.save();
    res.json(updatedDiet);
  } else {
    res.status(404);
    throw new Error('Diet not found');
  }
});

// @desc    Delete a diet
// @route   DELETE /api/diet/:id
// @access  Private/Admin
export const deleteDiet = asyncHandler(async (req, res) => {
  const diet = await Diet.findById(req.params.id);

  if (diet) {
    await Diet.deleteOne({ _id: diet._id });
    res.json({ message: `Diet: ${diet.name} removed` });
  } else {
    res.status(404);
    throw new Error('Diet not found');
  }
});
