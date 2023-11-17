import { model, Schema } from 'mongoose';

const ingredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
    },
    proteins: {
      type: Number,
    },
    fats: {
      type: Number,
    },
    carbohydrates: {
      type: Number,
    },
    image: {
      originalName: String,
      size: String,
      format: String,
      url: String,
    },
    allergy: String,
    measure: String,
    benefits: String,
  },
  {
    timestamps: true,
  }
);

const Ingredient = model('Ingredient', ingredientsSchema);

export default Ingredient;
