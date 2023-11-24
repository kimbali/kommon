import asyncHandler from '../middleware/asyncHandler.js';
import Legal from '../models/Legal.js';

// @desc    Fetch all legals
// @route   GET /api/legals
// @access  Public
export const getLegals = asyncHandler(async (req, res) => {
  const legals = await Legal.find();

  res.json({ legals });
});

// @desc    Fetch single legal
// @route   GET /api/legals/:id
// @access  Public
export const getLegalById = asyncHandler(async (req, res) => {
  const legal = await Legal.findById(req.params.id);

  if (legal) {
    return res.json(legal);
  } else {
    res.status(404);
    throw new Error('Legal not found');
  }
});

// @desc    Create a legal
// @route   POST /api/legals
// @access  Private/Admin
export const createLegal = asyncHandler(async (req, res) => {
  const newLegal = new Legal();

  const createdLegal = await newLegal.save();
  res.status(201).json(createdLegal);
});

// @desc    Update a legal
// @route   PUT /api/legals/:id
// @access  Private/Admin
export const updateLegal = asyncHandler(async (req, res) => {
  const { termsAndConditions, privacyPolicy, cookiesFiles, avisoLegal } =
    req.body;
  const legal = await Legal.findById(req.params.id);

  if (legal) {
    legal.termsAndConditions = termsAndConditions || legal.termsAndConditions;
    legal.privacyPolicy = privacyPolicy || legal.privacyPolicy;
    legal.cookiesFiles = cookiesFiles || legal.cookiesFiles;
    legal.avisoLegal = avisoLegal || legal.avisoLegal;

    const updatedLegal = await legal.save();
    res.json(updatedLegal);
  } else {
    res.status(404);
    throw new Error('Legal not found');
  }
});

// @desc    Delete a legal
// @route   DELETE /api/legal/:id
// @access  Private/Admin
export const deleteLegal = asyncHandler(async (req, res) => {
  const legal = await Legal.findById(req.params.id);

  if (legal) {
    await Legal.deleteOne({ _id: legal._id });
    res.json({ message: `Legal removed` });
  } else {
    res.status(404);
    throw new Error('Legal not found');
  }
});
