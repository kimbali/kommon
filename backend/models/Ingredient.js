import { model, Schema } from 'mongoose';

const ingredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    image: String,
    allergies: [String],
    menus: [String],
    measure: {
      type: String,
      required: true,
    },
    benefits: String,
  },
  {
    timestamps: true,
  }
);

const Ingredient = model('Ingredient', ingredientsSchema);

export default Ingredient;
