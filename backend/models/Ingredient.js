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
    image: {
      type: String,
      default: '',
    },
    allergies: [String],
    menus: [String],
    measure: {
      type: Schema.Types.ObjectId,
      ref: 'Measure',
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
