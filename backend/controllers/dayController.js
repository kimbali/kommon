import asyncHandler from '../middleware/asyncHandler.js';
import Planning, { Day } from '../models/Planning.js';

// @desc    Fetch all days
// @route   GET /api/days
// @access  Public
export const getDays = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        day: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const days = await Day.find({ ...keyword });

  res.json({ days });
});

// @desc    Fetch single day
// @route   GET /api/days/:id
// @access  Public
export const getDayById = asyncHandler(async (req, res) => {
  const day = await Day.findById(req.params.id)
    .populate({
      path: 'meals.recipe',
      model: 'Recipe',
      populate: {
        path: 'ingredients.ingredient',
        model: 'Ingredient',
      },
    })
    .populate('workouts')
    .populate('meditations')
    .populate('tasks');

  if (day) {
    return res.json(day);
  } else {
    res.status(404);
    throw new Error('Day not found');
  }
});

// @desc    Create a day
// @route   POST /api/days
// @access  Private/Admin
export const createDay = asyncHandler(async (req, res) => {
  const { week, weekDay } = req.body;

  const newDay = new Day({
    week,
    weekDay,
  });

  const createdDay = await newDay.save();

  if (createDay) {
    res.status(201).json(createdDay);
  } else {
    res.status(404);
    throw new Error('Day not found');
  }
});

// @desc    Update a day
// @route   PUT /api/days/:id
// @access  Private/Admin
export const updateDay = asyncHandler(async (req, res) => {
  const { week, weekDay, workouts, tasks, meditations, meals } = req.body;

  const day = await Day.findById(req.params.id);

  if (day) {
    day.week = week || day.week;
    day.weekDay = weekDay || day.weekDay;
    day.workouts = workouts || day.workouts;
    day.tasks = tasks || day.tasks;
    day.meditations = meditations || day.meditations;
    day.meals = meals || day.meals;

    const updatedDay = await day.save();
    res.json(updatedDay);
  } else {
    res.status(404);
    throw new Error('Day not found');
  }
});

// @desc    Delete a day
// @route   DELETE /api/day/:id
// @access  Private/Admin
export const deleteDay = asyncHandler(async (req, res) => {
  const day = await Day.findById(req.params.id);

  if (day) {
    await Day.deleteOne({ _id: day._id });
    res.json({ message: `Day removed` });
  } else {
    res.status(404);
    throw new Error('Day not found');
  }
});

/// NEWS

// @desc    Fetch single day
// @route   GET /api/days/diet/:diet
// @access  Public
export const getDayByMarathonDiet = asyncHandler(async (req, res) => {
  const day = await Day.find({ diet: req.params.diet })
    .populate({
      path: 'meals.recipe',
      model: 'Recipe',
    })
    .populate('workouts')
    .populate('meditations')
    .populate('tasks');

  res.json({ days });
});

// @desc    Fetch single day
// @route   DELETE /api/days
// @access  Private/admin
export const deleteAllDayInstances = asyncHandler(async (req, res) => {
  try {
    const condition = {};
    const result = await Day.deleteMany(condition);

    res.json(`${result.deletedCount} documents removed`);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

// @desc    Fetch single day by week and weekDay inside a month
// @route   GET /api/days/:id
// @access  Public
export const getMonthDayByWeekAndWeekDay = asyncHandler(async (req, res) => {
  const { planningId, week, weekDay } = req.params;

  const planning = await Planning.findById(planningId).populate('month');

  if (planning) {
    const dayInMonth = planning.month.find(
      ele => ele.week == week && ele.weekDay == weekDay
    );

    if (!dayInMonth) {
      res.status(404);
      throw new Error('Day not found in month');
      return;
    }

    const day = await Day.findById(dayInMonth._id)
      .populate({
        path: 'meals.recipe',
        model: 'Recipe',
        populate: {
          path: 'ingredients.ingredient',
          model: 'Ingredient',
        },
      })
      .populate('workouts')
      .populate('meditations')
      .populate('tasks');

    res.status(200);
    res.json(day);
  } else {
    res.status(404);
    throw new Error('Planning not found');
  }

  if (true) {
    return res.status(200);
    // return res.json();
  } else {
    res.status(404);
    throw new Error('Day not found');
  }
});
