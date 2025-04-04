import React from "react";
import { Card } from "react-bootstrap";

const NotificationCard: React.FC<{ title: string; message: string }> = ({ message, title }) => {
  return (
    <Card className="text-center shadow-sm my-3" style={{ maxWidth: "500px", margin: "0 auto" }}>
      <Card.Body>
        <Card.Title className="text-danger">{title}</Card.Title>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NotificationCard;
