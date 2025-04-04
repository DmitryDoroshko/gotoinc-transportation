import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchParcels, fetchSingleParcel, updateParcel } from "../../store/parcels/parcelsThunks.ts";
import CustomModal from "../shared/CustomModal/CustomModal.tsx";
import { formatForBootstrapDate } from "../../helpers/formatDate.ts";
import { useQuery } from "../../hooks/useQuery.tsx";

interface EditParcelFormInputs {
  senderCity: string;
  receiverCity: string;
  parcelType: "gadgets" | "drinks" | "clothes" | "medicines" | "other";
  dispatchDate: string;
  description: string;
}

const EditParcelForm: React.FC<{ onCloseEditing: () => void; }> = ({ onCloseEditing }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, setValue } = useForm<EditParcelFormInputs>();
  const singleParcel = useAppSelector(state => state.parcels.singleParcel);

  const query = useQuery();
  const prevParcelId = useRef<string | null>(null);

  useEffect(() => {
    const handleFetchParcelAndSetDefaultFields = async () => {
      const id = query.get("id");
      if (id && id !== prevParcelId.current) {
        prevParcelId.current = id;
        await dispatch(fetchSingleParcel(id)).unwrap();
        if (singleParcel) {
          setValue("senderCity", singleParcel.senderCity);
          setValue("receiverCity", singleParcel.receiverCity);
          setValue("parcelType", singleParcel.parcelType);
          setValue("dispatchDate", formatForBootstrapDate(singleParcel.dispatchDate.toString()));
          setValue("description", singleParcel.description);
        }
      }
    };
    handleFetchParcelAndSetDefaultFields();
  }, [singleParcel]);

  const onSubmit = async (data: EditParcelFormInputs) => {
    const parsedDispatchDate = new Date(data.dispatchDate);
    const id = query.get("id");

    if (!id) return;

    await dispatch(updateParcel({
      parcelId: id,
      parcel: {
        ...data,
        id,
        requestCreationTime: new Date(),
        dispatchDate: parsedDispatchDate,
      },
    })).unwrap();
    dispatch(fetchParcels());
    reset();
    onCloseEditing();
  };

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
