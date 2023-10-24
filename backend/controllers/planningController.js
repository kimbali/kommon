import asyncHandler from '../middleware/asyncHandler.js';
import Planning, { Day } from '../models/Planning.js';

// @desc    Fetch all plannings
// @route   GET /api/plannings
// @access  Public
export const getPlannings = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const plannings = await Planning.find({ ...keyword }).select('-month');

  res.json({ plannings });
});

// @desc    Fetch single planning
// @route   GET /api/plannings/:id
// @access  Public
export const getPlanningById = asyncHandler(async (req, res) => {
  const planning = await Planning.findById(req.params.id).populate({
    path: 'month',
    populate: {
      path: 'meals workouts meditations tasks',
      populate: {
        path: 'recipe',
        model: 'Recipe',
      },
    },
  });

  if (planning) {
    return res.json(planning);
  } else {
    res.status(404);
    throw new Error('Planning not found');
  }
});

// @desc    Create a planning
// @route   POST /api/plannings
// @access  Private/Admin
export const createPlanning = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newPlanning = new Planning({
    name,
  });

  const createdPlanning = await newPlanning.save();
  res.status(201).json(createdPlanning);
});

// @desc    Update a planning
// @route   PUT /api/plannings/:id
// @access  Private/Admin
export const updatePlanning = asyncHandler(async (req, res) => {
  const { name, month } = req.body;

  const planning = await Planning.findById(req.params.id);

  if (planning) {
    planning.name = name || planning.name;
    planning.month = month || planning.month;

    const updatedPlanning = await planning.save();
    res.json(updatedPlanning);
  } else {
    res.status(404);
    throw new Error('Planning not found');
  }
});

// @desc    Delete a planning
// @route   DELETE /api/planning/:id
// @access  Private/Admin
export const deletePlanning = asyncHandler(async (req, res) => {
  const planning = await Planning.findById(req.params.id);

  if (planning) {
    await Planning.deleteOne({ _id: planning._id });
    res.json({ message: `Planning ${planning.name} removed` });
  } else {
    res.status(404);
    throw new Error('Planning not found');
  }
});

// @desc    Delete all plannings
// @route   DELETE /api/planning
// @access  Private/Admin
export const deleteAllPlannings = asyncHandler(async (req, res) => {
  try {
    const result = await Planning.deleteMany();
    res.json(`${result.deletedCount} documents removed`);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});
