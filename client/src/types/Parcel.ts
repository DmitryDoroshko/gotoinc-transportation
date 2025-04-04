export interface IParcel {
  id: string;
  senderCity: string;
  receiverCity: string;
  parcelType: "gadgets" | "drinks" | "clothes" | "medicines" | "other";
  dispatchDate: Date;
  description: string;
  requestCreationTime: Date;
}