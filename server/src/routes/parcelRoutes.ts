import { Router, Request, Response } from "express";
import Parcel, { IParcel } from "../models/Parcel";

const router = Router();

// Create a new parcel request
router.post("/", async (req: Request, res: Response) => {
  try {
    const { senderCity, receiverCity, parcelType, dispatchDate, description } = req.body;

    if (!senderCity || !receiverCity || !parcelType || !dispatchDate || !description) {
      res.status(400).json({ message: "All fields are required" });
    }

    const newParcel = new Parcel(req.body);
    const savedParcel = await newParcel.save();
    res.status(201).json(savedParcel);
  } catch (error) {
    res.status(500).json({ message: "Error creating parcel", error });
  }
});

// Get all parcel requests
router.get("/", async (req: Request, res: Response) => {
  try {
    const parcels = await Parcel.find();
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parcels", error });
  }
});

// Get a single parcel by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) {
      res.status(404).json({ message: "Parcel not found" });
    }
    res.json(parcel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parcel", error });
  }
});

// Update a parcel request
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedParcel = await Parcel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParcel) {
      res.status(404).json({ message: "Parcel not found" });
    }
    res.json(updatedParcel);
  } catch (error) {
    res.status(500).json({ message: "Error updating parcel", error });
  }
});

// Delete a parcel request
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedParcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!deletedParcel) {
      res.status(404).json({ message: "Parcel not found" });
    }
    res.json({ message: "Parcel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting parcel", error });
  }
});

export default router;
