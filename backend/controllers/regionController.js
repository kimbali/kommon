import asyncHandler from '../middleware/asyncHandler.js';
import Region from '../models/Region.js';

// @desc    Fetch all regions
// @route   GET /api/regions
// @access  Public
export const getRegions = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        region: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const regions = await Region.find({ ...keyword });

  res.json({ regions });
});

// @desc    Fetch single region
// @route   GET /api/regions/:id
// @access  Public
export const getRegionById = asyncHandler(async (req, res) => {
  const region = await Region.findById(req.params.id);

  if (region) {
    return res.json(region);
  } else {
    res.status(404);
    throw new Error('Region not found');
  }
});

// @desc    Create a region
// @route   POST /api/regions
// @access  Private/Admin
export const createRegion = asyncHandler(async (req, res) => {
  const { region, price } = req.body;

  const newRegion = new Region({
    region,
    price,
  });

  const createdRegion = await newRegion.save();
  res.status(201).json(createdRegion);
});

// @desc    Update a region
// @route   PUT /api/regions/:id
// @access  Private/Admin
export const updateRegion = asyncHandler(async (req, res) => {
  const { region: regionParams, price } = req.body;

  const region = await Region.findById(req.params.id);

  if (region) {
    region.region = regionParams || region.region;
    region.price = price || region.price;

    const updatedRegion = await region.save();
    res.json(updatedRegion);
  } else {
    res.status(404);
    throw new Error('Region not found');
  }
});

// @desc    Delete a region
// @route   DELETE /api/region/:id
// @access  Private/Admin
export const deleteRegion = asyncHandler(async (req, res) => {
  const region = await Region.findById(req.params.id);

  if (region) {
    await Region.deleteOne({ _id: region._id });
    res.json({ message: `Region: ${region.region} removed` });
  } else {
    res.status(404);
    throw new Error('Region not found');
  }
});
