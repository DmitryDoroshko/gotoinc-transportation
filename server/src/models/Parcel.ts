import mongoose, { Schema, Document } from "mongoose";

export interface IParcel extends Document {
  id: string;
  senderCity: string;
  receiverCity: string;
  parcelType: string;
  dispatchDate: Date;
  description: string;
  requestCreationTime: Date;
}

const ParcelSchema = new Schema<IParcel>({
  senderCity: { type: String, required: true },
  receiverCity: { type: String, required: true },
  parcelType: { type: String, enum: ["gadgets", "drinks", "clothes", "medicines", "other"], required: true },
  dispatchDate: { type: Date, required: true },
  description: { type: String, required: true },
  requestCreationTime: { type: Date, default: Date.now, required: true },
});

ParcelSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString(); // Add `id` field as string
    delete ret._id; // Remove `_id` field
    return ret;
  },
});

export default mongoose.model<IParcel>("Parcel", ParcelSchema);
