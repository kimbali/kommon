import { model, Schema } from 'mongoose';

const LegalSchema = new Schema(
  {
    es: {
      termsAndConditions: String,
      privacyPolicy: String,
      cookiesFiles: String,
      avisoLegal: String,
    },
    ca: {
      termsAndConditions: String,
      privacyPolicy: String,
      cookiesFiles: String,
      avisoLegal: String,
    },
  },
  {
    timestamps: true,
  }
);

const Legal = model('Legal', LegalSchema);

export default Legal;
