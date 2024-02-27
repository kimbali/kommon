import asyncHandler from '../middleware/asyncHandler.js';
import Faq from '../models/Faq.js';

// @desc    Fetch all faqs
// @route   GET /api/faqs
// @access  Public
export const getFaqs = asyncHandler(async (req, res) => {
  const faqs = await Faq.find();

  res.json(faqs);
});

// @desc    Fetch single faq
// @route   GET /api/faqs/:id
// @access  Public
export const getFaqById = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);

  if (faq) {
    return res.json(faq);
  } else {
    res.status(404);
    throw new Error('Faq not found');
  }
});

// @desc    Create a faq
// @route   POST /api/faqs
// @access  Private/Admin
export const createFaq = asyncHandler(async (req, res) => {
  const { es, ca } = req.body;

  const newFaq = new Faq({
    es,
    ca,
  });

  const createdFaq = await newFaq.save();
  res.status(201).json(createdFaq);
});

// @desc    Update a faq
// @route   PUT /api/faqs/:id
// @access  Private/Admin
export const updateFaq = asyncHandler(async (req, res) => {
  const { es, ca } = req.body;

  const faq = await Faq.findById(req.params.id);

  if (faq) {
    faq.es = es || faq.es;
    faq.ca = ca || faq.ca;

    const updatedFaq = await faq.save();
    res.json(updatedFaq);
  } else {
    res.status(404);
    throw new Error('Faq not found');
  }
});

// @desc    Delete a faq
// @route   DELETE /api/faq/:id
// @access  Private/Admin
export const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);

  if (faq) {
    await Faq.deleteOne({ _id: faq._id });
    res.json({ message: `Faq ${faq.es.name} removed` });
  } else {
    res.status(404);
    throw new Error('Faq not found');
  }
});

// @desc    Fetch all faqs
// @route   DELETE /api/faqs
// @access  Private/admin
export const deleteAllFaqs = asyncHandler(async (req, res) => {
  try {
    const condition = {};
    const result = await Faq.deleteMany(condition);

    res.json(`${result.deletedCount} documents removed`);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});
