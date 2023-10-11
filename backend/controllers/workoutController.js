import asyncHandler from '../middleware/asyncHandler.js';
import Workout from '../models/Workout.js';

// @desc    Fetch all workouts
// @route   GET /api/workouts
// @access  Public
export const getWorkouts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const workouts = await Workout.find({ ...keyword });

  res.json({ workouts });
});

// @desc    Fetch single workout
// @route   GET /api/workouts/:id
// @access  Public
export const getWorkoutById = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (workout) {
    return res.json(workout);
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
});

// @desc    Create a workout
// @route   POST /api/workouts
// @access  Private/Admin
export const createWorkout = asyncHandler(async (req, res) => {
  const { title, description, minutes, image, video, level } = req.body;

  const newWorkout = new Workout({
    title,
    description,
    minutes,
    image,
    video,
    level,
  });

  const createdWorkout = await newWorkout.save();
  res.status(201).json(createdWorkout);
});

// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Private/Admin
export const updateWorkout = asyncHandler(async (req, res) => {
  const { title, description, minutes, image, video, level } = req.body;

  const workout = await Workout.findById(req.params.id);

  if (workout) {
    workout.title = title || workout.title;
    workout.description = description || workout.description;
    workout.minutes = minutes || workout.minutes;
    workout.image = image || workout.image;
    workout.video = video || workout.video;
    workout.level = level || workout.level;

    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
});

// @desc    Delete a workout
// @route   DELETE /api/workout/:id
// @access  Private/Admin
export const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (workout) {
    await Workout.deleteOne({ _id: workout._id });
    res.json({ message: `Workout ${workout.title} removed` });
  } else {
    res.status(404);
    throw new Error('Workout not found');
  }
});
