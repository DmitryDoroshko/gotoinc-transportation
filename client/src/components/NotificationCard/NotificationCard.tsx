import React from "react";
import { Card } from "react-bootstrap";

const NotificationCard: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Card className="text-center shadow-sm my-3" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <Card.Body>
        <Card.Title className="text-danger">No Parcels Available</Card.Title>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NotificationCard;
