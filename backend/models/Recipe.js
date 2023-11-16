import { Schema, model } from 'mongoose';

// const ingredientsSchema = new Schema(
//   {
//     quantity: { type: Number },
//     ingredient: {
//       type: Schema.Types.ObjectId,
//       ref: 'Ingredient',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

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
      type: String,
      url: String,
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
    meals: [String],
  },
  {
    timestamps: true,
  }
);

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
