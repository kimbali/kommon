import { model, Schema } from 'mongoose';

const LegalSchema = new Schema(
  {
    termsAndConditions: String,
    privacyPolicy: String,
    cookiesFiles: String,
    avisoLegal: String,
  },
  {
    timestamps: true,
  }
);

const Legal = model('Legal', LegalSchema);

export default Legal;
