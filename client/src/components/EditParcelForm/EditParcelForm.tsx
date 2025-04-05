import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchParcels, fetchSingleParcel, updateParcel } from "../../store/parcels/parcelsThunks.ts";
import CustomModal from "../shared/CustomModal/CustomModal.tsx";
import { formatForBootstrapDate } from "../../helpers/formatDate.ts";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

interface EditParcelFormInputs {
  senderCity: string;
  receiverCity: string;
  parcelType: "gadgets" | "drinks" | "clothes" | "medicines" | "other";
  dispatchDate: string;
  description: string;
}

const getId = (search: string) => {
  return (new URLSearchParams(search)).get("id");
};

const EditParcelForm: React.FC<{ onCloseEditing: () => void; isEditing: boolean; }> = (
  {
    onCloseEditing,
    isEditing,
  }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, setValue } = useForm<EditParcelFormInputs>();
  const singleParcel = useAppSelector(state => state.parcels.singleParcel);

  const { search } = useLocation();
  const id = getId(search);
  const prevParcelId = useRef<string | null>(null);

  useEffect(() => {
    const handleFetchParcelAndSetDefaultFields = async () => {
      if (id && id !== prevParcelId.current) {
        prevParcelId.current = id;
        const parcel = await dispatch(fetchSingleParcel(id)).unwrap();
        if (parcel) {
          setValue("senderCity", parcel.senderCity);
          setValue("receiverCity", parcel.receiverCity);
          setValue("parcelType", parcel.parcelType);
          if (parcel.dispatchDate) {
            setValue("dispatchDate", formatForBootstrapDate(parcel.dispatchDate.toString()));
          }
          setValue("description", parcel.description);
        }
      }
    };
    handleFetchParcelAndSetDefaultFields();
  }, [singleParcel, id]);

  const onSubmit = async (data: EditParcelFormInputs) => {
    const parsedDispatchDate = new Date(data.dispatchDate);
    const id = getId(search);

    if (!id) {
      return;
    }

    await dispatch(updateParcel({
      parcelId: id,
      parcel: {
        ...data,
        id,
        requestCreationTime: new Date(),
        dispatchDate: parsedDispatchDate,
      },
    })).unwrap();
    toast("Finished editing!", { position: "bottom-right" });
    dispatch(fetchParcels());
    reset();
    onCloseEditing();
  };

  if (!isEditing) return null;

  return (
    <CustomModal onClose={onCloseEditing} title={"Edit form"}>
      <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded bg-light">
        <Form.Group controlId="fromCity">
          <Form.Label>City from which the parcel is sent</Form.Label>
          <Form.Control type="text" {...register("senderCity")} required />
        </Form.Group>

        <Form.Group controlId="toCity" className="mt-3">
          <Form.Label>City to which the parcel is sent</Form.Label>
          <Form.Control type="text" {...register("receiverCity")} required />
        </Form.Group>

        <Form.Group controlId="parcelType" className="mt-3">
          <Form.Label>Type of parcel</Form.Label>
          <Form.Select {...register("parcelType")} required>
            <option value="gadgets">Gadgets</option>
            <option value="drinks">Drinks</option>
            <option value="clothes">Clothes</option>
            <option value="medicines">Medicines</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="dispatchDate" className="mt-3">
          <Form.Label>Date of dispatch</Form.Label>
          <Form.Control {...register("dispatchDate")} type="date" required />
        </Form.Group>

        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Parcel description</Form.Label>
          <Form.Control {...register("description")} as="textarea" rows={3} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3" onClick={handleSubmit(onSubmit)}>Submit Edited</Button>
      </Form>
    </CustomModal>
  );
};

export default EditParcelForm;
