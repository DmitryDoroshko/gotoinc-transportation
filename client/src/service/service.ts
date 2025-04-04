import api from "./setup.ts";
import { IParcel } from "../types/Parcel.ts";

export const service = {
  async getAllParcels() {
    return await api.get("/parcels");
  },
  async createParcel(parcel: IParcel) {
    return await api.post('/parcels', parcel);
  },
  async deleteParcel(parcelId: string) {
    return await api.delete(`/parcels/${parcelId}`);
  },
  async updateParcel({ parcelId, parcel }: { parcelId: string; parcel: IParcel }) {
    const response = await api.put(`/parcels/${parcelId}`, parcel);
    return response;
  },
  async getParcelById(parcelId: string) {
    return await api.get(`/parcels/${parcelId}`);
  },
};