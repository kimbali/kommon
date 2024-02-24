import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      default: 'Missing title',
    },
    steps: [{ type: String, default: '' }],
    ingredients: [
      {
        quantity: { type: Number },
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
        },
      },
    ],
    minutes: {
      type: Number,
      default: 0,
    },
    image: {
      originalName: String,
      size: String,
      format: String,
      url: String,
    },
    meals: [String],
  },
  {
    timestamps: true,
  }
);

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
