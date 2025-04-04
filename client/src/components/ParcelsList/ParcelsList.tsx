import React, { useEffect, useState } from "react";
import { IParcel } from "../../types/Parcel";
import { Button, ListGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteParcel, fetchParcels } from "../../store/parcels/parcelsThunks";
import { toast } from "react-toastify";
import { setSingleParcel } from "../../store/parcels/parcelsSlice.ts";
import { RouterEnum } from "../../constants/enums/routerEnum.ts";
import { formatDateForUser } from "../../helpers/formatDate.ts";
import NotificationCard from "../NotificationCard/NotificationCard.tsx";
import EditParcelForm from "../EditParcelForm/EditParcelForm.tsx";
import { useNavigate } from "react-router";

const ParcelsList: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const parcels = useAppSelector(state => state.parcels.parcels);
  const navigate = useNavigate();

  const handleDelete = (parcelId: string) => {
    dispatch(deleteParcel(parcelId));
    toast("Parcel deleted!", { position: "bottom-right" });
    dispatch(fetchParcels());
  };

  const handleEdit = (parcel: IParcel) => {
    setIsEditing(true);
    dispatch(setSingleParcel(parcel));
  };

  useEffect(() => {
    const getAllParcels = async () => {
      dispatch(fetchParcels());
    };
    getAllParcels();
  }, []);

  const addToHistoryWithEdit = (parcel: IParcel) => () => {
    navigate(`/${RouterEnum.PARCELS_MANAGEMENT}?id=${parcel.id}`, { replace: false });
    handleEdit(parcel);
  };

  const renderedParcels = parcels.map((parcel: IParcel) => (
    <ListGroup.Item key={parcel.id} style={{ marginBottom: "10px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5>{parcel.senderCity} → {parcel.receiverCity}</h5>
          <p>Type: {parcel.parcelType}. Description: {parcel.description}</p>
          {parcel.requestCreationTime &&
            <p>Request Creation Time: {formatDateForUser(parcel.requestCreationTime.toString())}</p>}
        </div>
        <div>
          <Button variant="warning" onClick={addToHistoryWithEdit(parcel)} className="me-2">
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(parcel.id)}>
            Delete
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  ));

  return (
    <div>
      {isEditing ? <EditParcelForm onCloseEditing={() => setIsEditing(false)} /> : null}
      <h3 className={"text-center"}>Parcel List</h3>
      <ListGroup>
        {parcels.length > 0 ? renderedParcels :
          <NotificationCard message="There are no parcels available at the moment. Add a new parcel to get started!" />}
      </ListGroup>
    </div>
  );
};

export default ParcelsList;
