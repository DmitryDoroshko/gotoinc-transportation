import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IParcel } from "../../types/Parcel.ts";
import { createParcel, deleteParcel, fetchParcels, fetchSingleParcel, updateParcel } from "./parcelsThunks.ts";

interface ParcelState {
  parcels: IParcel[];
  loading: boolean;
  error: string | null;
  singleParcel: IParcel | null;
}

const initialState: ParcelState = {
  parcels: [],
  loading: false,
  error: null,
  singleParcel: null,
};

const parcelsSlice = createSlice({
  name: "parcels",
  initialState,
  reducers: {
    setSingleParcel: (state, action: PayloadAction<IParcel>) => {
      state.singleParcel = action.payload;
    },
  },
  extraReducers: (builder) => {
    // @ts-ignore
    builder
      .addCase(fetchParcels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParcels.fulfilled, (state, action: PayloadAction<IParcel[]>) => {
        state.loading = false;
        state.parcels = action.payload;
      })
      .addCase(fetchParcels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch parcels";
      })
      .addCase(createParcel.pending, (state) => {
        state.loading = true;
      })
      .addCase(createParcel.fulfilled, (state, action: PayloadAction<IParcel>) => {
        state.loading = false;
        state.parcels.push(action.payload);
      })
      .addCase(createParcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create parcel";
      })
      .addCase(deleteParcel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteParcel.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.parcels = state.parcels.filter((parcel) => parcel.id !== action.payload);
      })
      .addCase(deleteParcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete parcel";
      })
      .addCase(updateParcel.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateParcel.fulfilled, (state, action: PayloadAction<IParcel>) => {
        state.loading = false;
        const index = state.parcels.findIndex((parcel) => parcel.id === action.payload.id);
        if (index !== -1) {
          state.parcels[index] = action.payload;
        }
      })
      .addCase(updateParcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update parcel";
      })
      .addCase(fetchSingleParcel.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleParcel.fulfilled, (state, action: PayloadAction<IParcel>) => {
        state.loading = false;
        state.singleParcel = action.payload; // Store the fetched single parcel
      })
      .addCase(fetchSingleParcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch parcel";
      });
  },
});

export const { setSingleParcel } = parcelsSlice.actions;

export default parcelsSlice.reducer;
