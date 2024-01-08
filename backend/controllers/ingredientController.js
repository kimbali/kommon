import asyncHandler from '../middleware/asyncHandler.js';
import Ingredient from '../models/Ingredient.js';

// @desc    Fetch all ingredients
// @route   GET /api/ingredients
// @access  Public
export const getIngredients = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // insensible mayus-minusculas
        },
      }
    : {};

  const ingredients = await Ingredient.find({ ...keyword }).populate('measure');

  res.json({ ingredients });
});

// @desc    Fetch single ingredient
// @route   GET /api/ingredients/:id
// @access  Public
export const getIngredientById = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (ingredient) {
    return res.json(ingredient);
  } else {
    res.status(404);
    throw new Error('Ingredient not found');
  }
});

// @desc    Create a ingredient
// @route   POST /api/ingredients
// @access  Private/Admin
export const createIngredient = asyncHandler(async (req, res) => {
  const {
    name,
    calories,
    proteins,
    fats,
    carbohydrates,
    image,
    allergy,
    measure,
    benefits,
    supermarket,
  } = req.body;

  const newIngredient = new Ingredient({
    name,
    calories,
    proteins,
    fats,
    carbohydrates,
    image,
    allergy,
    measure,
    benefits,
    supermarket,
  });

  const createdIngredient = await newIngredient.save();
  res.status(201).json(createdIngredient);
});

// @desc    Update a ingredient
// @route   PUT /api/ingredients/:id
// @access  Private/Admin
export const updateIngredient = asyncHandler(async (req, res) => {
  const {
    name,
    calories,
    proteins,
    fats,
    carbohydrates,
    image,
    allergy,
    measure,
    benefits,
    supermarket,
  } = req.body;

  const ingredient = await Ingredient.findById(req.params.id);

  if (ingredient) {
    ingredient.name = name || ingredient.name;
    ingredient.calories = calories || ingredient.calories;
    ingredient.proteins = proteins || ingredient.proteins;
    ingredient.fats = fats || ingredient.fats;
    ingredient.carbohydrates = carbohydrates || ingredient.carbohydrates;
    ingredient.image = image || ingredient.image;
    ingredient.allergy = allergy || ingredient.allergy;
    ingredient.measure = measure || ingredient.measure;
    ingredient.benefits = benefits || ingredient.benefits;
    ingredient.supermarket = supermarket || ingredient.supermarket;

    const updatedIngredient = await ingredient.save();
    res.json(updatedIngredient);
  } else {
    res.status(404);
    throw new Error('Ingredient not found');
  }
});

// @desc    Delete a ingredient
// @route   DELETE /api/ingredient/:id
// @access  Private/Admin
export const deleteIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findById(req.params.id);

  if (ingredient) {
    await Ingredient.deleteOne({ _id: ingredient._id });
    res.json({ message: `Ingredient ${ingredient.name} removed` });
  } else {
    res.status(404);
    throw new Error('Ingredient not found');
  }
});

// @desc    Fetch all ingredients
// @route   DELETE /api/ingredients
// @access  Private/admin
export const deleteAllIngredients = asyncHandler(async (req, res) => {
  try {
    const condition = {};
    const result = await Ingredient.deleteMany(condition);

    res.json(`${result.deletedCount} documents removed`);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});
