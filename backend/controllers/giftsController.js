import asyncHandler from '../middleware/asyncHandler.js';
import Gift from '../models/Gift.js';

// @desc    Fetch all gifts
// @route   GET /api/gifts
// @access  Public
export const getGifts = asyncHandler(async (req, res) => {
  const findBy = {};

  if (req.query.quantity && req.query.quantity === 'true') {
    findBy.quantity = { $gt: 0 };
  }

  const gifts = await Gift.find(findBy);

  res.json(gifts);
});

// @desc    Fetch single gift
// @route   GET /api/gifts/:id
// @access  Public
export const getGiftById = asyncHandler(async (req, res) => {
  const gift = await Gift.findById(req.params.id);

  if (gift) {
    return res.json(gift);
  } else {
    res.status(404);
    throw new Error('Gift not found');
  }
});

// @desc    Create a gift
// @route   POST /api/gifts
// @access  Private/Admin
export const createGift = asyncHandler(async (req, res) => {
  const { es, ca, image, quantity } = req.body;

  const newGift = new Gift({
    image,
    quantity,
    es,
    ca,
  });

  const createdGift = await newGift.save();
  res.status(201).json(createdGift);
});

// @desc    Update a gift
// @route   PUT /api/gifts/:id
// @access  Private/Admin
export const updateGift = asyncHandler(async (req, res) => {
  const { image, quantity, es, ca } = req.body;

  const gift = await Gift.findById(req.params.id);

  if (gift) {
    gift.image = image || gift.image;
    gift.quantity = quantity || gift.quantity;
    gift.es = es || gift.es;
    gift.ca = ca || gift.ca;

    const updatedGift = await gift.save();
    res.json(updatedGift);
  } else {
    res.status(404);
    throw new Error('Gift not found');
  }
});

// @desc    Descrease 1 quantity
// @route   PUT /api/gifts/buyone/:id
// @access  Private/Admin
export const buyOneGift = asyncHandler(async (req, res) => {
  const gift = await Gift.findById(req.params.id);

  if (gift) {
    gift.quantity = gift.quantity - 1;

    const updatedGift = await gift.save();
    res.json(updatedGift);
  } else {
    res.status(404);
    throw new Error('Gift not found');
  }
});

// @desc    Delete a gift
// @route   DELETE /api/gift/:id
// @access  Private/Admin
export const deleteGift = asyncHandler(async (req, res) => {
  const gift = await Gift.findById(req.params.id);

  if (gift) {
    await Gift.deleteOne({ _id: gift._id });
    res.json({ message: `Gift ${gift.es.name} removed` });
  } else {
    res.status(404);
    throw new Error('Gift not found');
  }
});

// @desc    Fetch all gifts
// @route   DELETE /api/gifts
// @access  Private/admin
export const deleteAllGifts = asyncHandler(async (req, res) => {
  try {
    const condition = {};
    const result = await Gift.deleteMany(condition);

    res.json(`${result.deletedCount} documents removed`);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});
