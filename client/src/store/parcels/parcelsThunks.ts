import { createAsyncThunk } from "@reduxjs/toolkit";
import { service } from "../../service/service.ts";
import { IParcel } from "../../types/Parcel.ts";

export const fetchParcels = createAsyncThunk("parcels/fetchParcels", async () => {
  const response = await service.getAllParcels();
  return response.data;
});

export const createParcel = createAsyncThunk(
  "parcels/createParcel",
  async (parcel: IParcel) => {
    const response = await service.createParcel(parcel);
    return response.data;
  },
);

export const deleteParcel = createAsyncThunk(
  "parcels/deleteParcel",
  async (parcelId: string) => {
    const response =  await service.deleteParcel(parcelId);
    return response.data;
  },
);

export const updateParcel = createAsyncThunk(
  "parcels/updateParcel",
  async ({ parcelId, parcel }: { parcelId: string; parcel: IParcel }) => {
    const response = await service.updateParcel({ parcelId, parcel });
    return response.data;
  },
);

export const fetchSingleParcel = createAsyncThunk(
  "parcels/fetchSingleParcel",
  async (parcelId: string) => {
    const response = await service.getParcelById(parcelId);
    return response.data;
  },
);
