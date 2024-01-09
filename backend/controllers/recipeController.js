import asyncHandler from '../middleware/asyncHandler.js';
import Recipe from '../models/Recipe.js';

// @desc    Fetch all recipes
// @route   GET /api/recipes?keyword=pollo
// @access  Public
export const getRecipes = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const recipes = await Recipe.find({ ...keyword }).populate({
    path: 'ingredients',
    populate: {
      path: 'ingredient',
      model: 'Ingredient',
    },
  });

  res.json({ recipes });
});

// @desc    Fetch single recipe
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate({
    path: 'ingredients',
    populate: {
      path: 'ingredient',
      model: 'Ingredient',
    },
  });

  if (recipe) {
    return res.json(recipe);
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private/Admin
export const createRecipe = asyncHandler(async (req, res) => {
  const { title, steps, ingredients, minutes, image, meals } = req.body;

  const recipe = new Recipe({
    title,
    steps,
    ingredients,
    minutes,
    image,
    meals,
  });

  try {
    const createdRecipe = await recipe.save();
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Private/Admin
export const updateRecipe = asyncHandler(async (req, res) => {
  const { title, steps, ingredients, minutes, image, meals } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    recipe.title = title || recipe.title;
    recipe.steps = steps || recipe.steps;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.minutes = minutes || recipe.minutes;
    recipe.image = image || recipe.image;
    recipe.meals = meals || recipe.meals;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});

// @desc    Delete a recipe
// @route   DELETE /api/recipe/:id
// @access  Private/Admin
export const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    await Recipe.deleteOne({ _id: recipe._id });
    res.json({ message: `Recipe ${recipe.title} removed` });
  } else {
    res.status(404);
    throw new Error('Recipe not found');
  }
});
