import asyncHandler from '../middleware/asyncHandler.js';
import Progress from '../models/Progress.js';

// @desc    Fetch all progresses
// @route   GET /api/progresses
// @access  Private
export const getProgresses = asyncHandler(async (req, res) => {
  const user = !!req.query.userId
    ? {
        user: req.query.userId,
      }
    : {};

  const progresses = await Progress.find({
    ...user,
  });

  res.json({ progresses });
});

// @desc    Fetch single progress
// @route   GET /api/progresses/:id
// @access  Private
export const getProgressById = asyncHandler(async (req, res) => {
  const progress = await Progress.findById(req.params.id);

  if (progress) {
    return res.json(progress);
  } else {
    res.status(404);
    throw new Error('Progress not found');
  }
});

// @desc    Create a progress
// @route   POST /api/progresses
// @access  Private
export const createProgress = asyncHandler(async (req, res) => {
  const { user, marathon, isPaid } = req.body;
  const newProgress = new Progress({
    marathon,
    user,
    isPaid,
  });

  const createdProgress = await newProgress.save();

  res.status(201).json(createdProgress);
});

// @desc    Update a progress
// @route   PUT /api/progresses/:id
// @access  Private
export const updateProgress = asyncHandler(async (req, res) => {
  const {
    isPaid,
    gift,
    initialPhoto,
    photoFinish,
    weight,
    chest,
    waist,
    buttocks,
    recipes,
    workouts,
    meditations,
    tasksChecked,
  } = req.body;

  const progress = await Progress.findById(req.params.id);

  if (progress) {
    progress.isPaid = isPaid;
    progress.gift = gift || progress.gift;
    progress.initialPhoto = initialPhoto || progress.initialPhoto;
    progress.photoFinish = photoFinish || progress.photoFinish;
    progress.weight = weight || progress.weight;
    progress.chest = chest || progress.chest;
    progress.waist = waist || progress.waist;
    progress.buttocks = buttocks || progress.buttocks;
    progress.recipes = recipes || progress.recipes;
    progress.workouts = workouts || progress.workouts;
    progress.meditations = meditations || progress.meditations;
    progress.tasksChecked = tasksChecked || progress.tasksChecked;

    const updatedProgress = await progress.save();

    res.json(updatedProgress);
  } else {
    res.status(404);
    throw new Error('Progress not found');
  }
});

// @desc    Delete a progress
// @route   DELETE /api/progress/:id
// @access  Private/Admin
export const deleteProgress = asyncHandler(async (req, res) => {
  const progress = await Progress.findById(req.params.id);

  if (progress) {
    await Progress.deleteOne({ _id: progress._id });
    res.json({ message: `Progress removed` });
  } else {
    res.status(404);
    throw new Error('Progress not found');
  }
});

// @desc    Delete all progresses
// @route   DELETE /api/progresses
// @access  Private/admin
export const deleteAllProgresses = asyncHandler(async (req, res) => {
  try {
    const condition = {};
    const result = await Progress.deleteMany(condition);

    res.json(`${result.deletedCount} documents removed`);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});
