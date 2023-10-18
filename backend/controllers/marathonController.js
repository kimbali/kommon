import asyncHandler from '../middleware/asyncHandler.js';
import Marathon from '../models/Marathon.js';

// @desc    Fetch all marathons
// @route   GET /api/marathons
// @access  Public
export const getMarathons = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        startDate: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const marathons = await Marathon.find({ ...keyword });

  res.json({ marathons });
});

// @desc    Fetch single marathon
// @route   GET /api/marathons/:id
// @access  Public
export const getMarathonById = asyncHandler(async (req, res) => {
  const marathon = await Marathon.findById(req.params.id);

  if (marathon) {
    return res.json(marathon);
  } else {
    res.status(404);
    throw new Error('Marathon not found');
  }
});

// @desc    Create a marathon
// @route   POST /api/marathons
// @access  Private/Admin
export const createMarathon = asyncHandler(async (req, res) => {
  const { startDate, endDate, name, planning } = req.body;
  const newMarathon = new Marathon({ startDate, endDate, name, planning });

  const createdMarathon = await newMarathon.save();
  res.status(201).json(createdMarathon);
});

// @desc    Update a marathon
// @route   PUT /api/marathons/:id
// @access  Private/Admin
export const updateMarathon = asyncHandler(async (req, res) => {
  const { startDate, endDate, name, planning } = req.body;

  const marathon = await Marathon.findById(req.params.id);

  if (marathon) {
    marathon.startDate = startDate || marathon.startDate;
    marathon.endDate = endDate || marathon.endDate;
    marathon.name = name || marathon.name;
    marathon.planning = { ...planning } || { ...marathon.planning };

    const updatedMarathon = await marathon.save();
    res.json(updatedMarathon);
  } else {
    res.status(404);
    throw new Error('Marathon not found');
  }
});

// @desc    Delete a marathon
// @route   DELETE /api/marathon/:id
// @access  Private/Admin
export const deleteMarathon = asyncHandler(async (req, res) => {
  const marathon = await Marathon.findById(req.params.id);

  if (marathon) {
    await Marathon.deleteOne({ _id: marathon._id });
    res.json({ message: `Marathon ${marathon.title} removed` });
  } else {
    res.status(404);
    throw new Error('Marathon not found');
  }
});
