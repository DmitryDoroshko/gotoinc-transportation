import React, { useEffect, useState } from "react";
import { IParcel } from "../../types/Parcel";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteParcel, fetchParcels } from "../../store/parcels/parcelsThunks";
import { toast } from "react-toastify";
import { setSingleParcel } from "../../store/parcels/parcelsSlice.ts";
import { RouterEnum } from "../../constants/enums/routerEnum.ts";
import { formatDateForUser } from "../../helpers/formatDate.ts";
import NotificationCard from "../NotificationCard/NotificationCard.tsx";
import EditParcelForm from "../EditParcelForm/EditParcelForm.tsx";
import { useNavigate } from "react-router";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const ParcelsList: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const parcels = useAppSelector(state => state.parcels.parcels);
  const navigate = useNavigate();
  const [currentParcelId, setCurrentParcelId] = useState<string | null>(null);

  const handleDelete = (parcelId: string) => {
    dispatch(deleteParcel(parcelId));
    toast("Parcel deleted!", { position: "bottom-right" });
    dispatch(fetchParcels());
  };

  const handleEdit = (parcel: IParcel) => {
    dispatch(setSingleParcel(parcel));
    setIsEditing(true);
    setCurrentParcelId(parcel.id);
  };

  useEffect(() => {
    const getAllParcels = async () => {
      dispatch(fetchParcels());
    };
    getAllParcels();
  }, []);

  const addToHistoryWithEdit = (parcel: IParcel) => () => {
    handleEdit(parcel);
    navigate(`/${RouterEnum.PARCELS_MANAGEMENT}?id=${parcel.id}`, { replace: false });
  };

  const renderedParcels = parcels.map((parcel: IParcel) => (
    <ListGroup.Item key={parcel.id} className="p-3 border rounded shadow-sm mb-3">
      <Row className="align-items-center">
        {/* Parcel Details */}
        <Col xs={8}>
          <h5 className="fw-bold text-primary">
            {parcel.senderCity} → {parcel.receiverCity}
          </h5>
          <p className="mb-1">
            <strong>Type:</strong> {parcel.parcelType}
          </p>
          <p className="mb-1">
            <strong>Description:</strong> {parcel.description}
          </p>
          <p className="mb-1">
            <strong>Date of Dispatch:</strong> {formatDateForUser(parcel.dispatchDate.toString())}
          </p>
          {parcel.requestCreationTime && (
            <p className="text-muted small">
              <strong>Created:</strong> {formatDateForUser(parcel.requestCreationTime.toString())}
            </p>
          )}
        </Col>

        {/* Action Buttons */}
        <Col xs={4} className="text-end">
          <Button variant="outline-warning" onClick={addToHistoryWithEdit(parcel)} className="me-2">
            <PencilSquare className="me-1" /> Edit
          </Button>
          <Button variant="outline-danger" onClick={() => handleDelete(parcel.id)}>
            <Trash className="me-1" /> Delete
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  ));

  return (
    <div>
      <EditParcelForm key={currentParcelId} onCloseEditing={() => setIsEditing(false)} isEditing={isEditing} />
      <h3 className="text-center">Parcel List</h3>
      <ListGroup>
        {parcels.length > 0 ? renderedParcels :
          <NotificationCard title="No Parcels Available"
                            message="There are no parcels available at the moment. Add a new parcel to get started!" />}
      </ListGroup>
    </div>
  );
};

export default ParcelsList;
