import asyncHandler from '../middleware/asyncHandler.js';
import Config from '../models/Config.js';

// @desc    Fetch all configs
// @route   GET /api/configs
// @access  Public
export const getConfigs = asyncHandler(async (req, res) => {
  const config = await Config.find({}).populate('landingConfig');

  res.json(config);
});

// @desc    Fetch all configs
// @route   GET /api/configs/landing/:lang
// @access  Public
export const getConfigsLanding = asyncHandler(async (req, res) => {
  if (req.params.lang) {
    const [config] = await Config.find({});

    const languagesLabels = config?.landingConfig?.find(
      ele => ele.lang === req.params.lang
    );

    res.json(languagesLabels);
  } else {
    const config = await Config.find()
      .populate('landingConfig')
      .select('landingConfig');

    res.json(config);
  }
});

// @desc    Fetch single config
// @route   GET /api/configs/:id
// @access  Public
export const getConfigById = asyncHandler(async (req, res) => {
  const config = await Config.findById(req.params.id).populate('landingConfig');

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
  const {
    price,
    activeMeditations,
    workoutsLevel,
    vacuumVideo,
    waterTracker,
    landingConfig,
  } = req.body;

  const config = await Config.findById(req.params.id);

  if (config) {
    config.price = price || config.price;
    config.activeMeditations = activeMeditations;
    config.workoutsLevel = workoutsLevel;
    config.waterTracker = waterTracker || config.waterTracker;
    config.vacuumVideo = vacuumVideo || config.vacuumVideo;
    config.landingConfig = landingConfig
      ? [...landingConfig]
      : config.landingConfig;

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
