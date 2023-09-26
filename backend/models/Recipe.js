import { Schema, model } from 'mongoose';

const ingredientsSchema = new Schema(
  {
    quantity: { type: Number },
    ingredient: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  },
  {
    timestamps: true,
  }
);

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      default: 'Missing title',
    },
    steps: [{ type: String, default: '' }],
    ingredients: [ingredientsSchema],
    minutes: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    calories: {
      type: Number,
      default: 0,
    },
    proteins: {
      type: Number,
      default: 0,
    },
    fats: {
      type: Number,
      default: 0,
    },
    carbohydrates: {
      type: Number,
      default: 0,
    },
    categories: [String],
  },
  {
    timestamps: true,
  }
);

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
