import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useAppDispatch } from "../../store";
import { createParcel } from "../../store/parcels/parcelsThunks.ts";
import { toast } from "react-toastify";

interface RequestFormInputs {
  senderCity: string;
  receiverCity: string;
  parcelType: "gadgets" | "drinks" | "clothes" | "medicines" | "other";
  dispatchDate: string;
  description: string;
}

const RequestForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<RequestFormInputs>();
  const dispatch = useAppDispatch();

  const onSubmit = (data: RequestFormInputs) => {
    const parsedDispatchDate = new Date(data.dispatchDate);
    dispatch(createParcel({
      ...data,
      id: crypto.randomUUID(),
      requestCreationTime: new Date(),
      dispatchDate: parsedDispatchDate,
    }));
    toast("Parcel added!", { position: "bottom-right" });
    reset();
  };

  return (
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
        <Form.Control type="date" {...register("dispatchDate")} required />
      </Form.Group>

      <Form.Group controlId="description" className="mt-3">
        <Form.Label>Parcel description</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("description")} required />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">Submit Request</Button>
    </Form>
  );
};

export default RequestForm;
