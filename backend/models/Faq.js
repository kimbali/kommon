import { model, Schema } from 'mongoose';

const faqsSchema = new Schema(
  {
    es: {
      title: String,
      description: String,
    },
    ca: {
      title: String,
      description: String,
    },
  },
  {
    timestamps: true,
  }
);

const Faq = model('Faq', faqsSchema);

export default Faq;
