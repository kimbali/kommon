import asyncHandler from '../middleware/asyncHandler.js';
import Task from '../models/Task.js';

// @desc    Fetch all tasks
// @route   GET /api/tasks
// @access  Public
export const getTasks = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const tasks = await Task.find({ ...keyword });

  res.json({ tasks });
});

// @desc    Fetch single task
// @route   GET /api/tasks/:id
// @access  Public
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    return res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private/Admin
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, checked } = req.body;

  const newTask = new Task({
    title,
    description,
    checked,
  });

  const createdTask = await newTask.save();
  res.status(201).json(createdTask);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private/Admin
export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, checked } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.checked = checked || task.checked;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete a task
// @route   DELETE /api/task/:id
// @access  Private/Admin
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await Task.deleteOne({ _id: task._id });
    res.json({ message: `Task: ${task.title} removed` });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});
