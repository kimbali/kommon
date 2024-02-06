import asyncHandler from '../middleware/asyncHandler.js';
import Config from '../models/Config.js';

// @desc    Fetch all configs
// @route   GET /api/configs
// @access  Public
export const getConfigs = asyncHandler(async (req, res) => {
  const config = await Config.find({});

  res.json(config);
});

// @desc    Fetch single config
// @route   GET /api/configs/:id
// @access  Public
export const getConfigById = asyncHandler(async (req, res) => {
  const config = await Config.findById(req.params.id);

  if (config) {
    return res.json(config);
  } else {
    res.status(404);
    throw new Error('Config not found');
  }
});

// @desc    Create a config
// @route   POST /api/configs
// @access  Private/Admin
export const createConfig = asyncHandler(async (req, res) => {
  const newConfig = new Config();
  const createdConfig = await newConfig.save();

  res.status(201).json(createdConfig);
});

// @desc    Update a config
// @route   PUT /api/configs/:id
// @access  Private/Admin
export const updateConfig = asyncHandler(async (req, res) => {
  const { activeMeditations } = req.body;

  const config = await Config.findById(req.params.id);

  if (config) {
    config.activeMeditations = activeMeditations;

    const updatedConfig = await config.save();
    res.json(updatedConfig);
  } else {
    res.status(404);
    throw new Error('Config not found');
  }
});

// @desc    Delete a config
// @route   DELETE /api/config/:id
// @access  Private/Admin
export const deleteConfig = asyncHandler(async (req, res) => {
  const config = await Config.findById(req.params.id);

  if (config) {
    await Config.deleteOne({ _id: config._id });
    res.json({ message: `Config removed` });
  } else {
    res.status(404);
    throw new Error('Config not found');
  }
});
