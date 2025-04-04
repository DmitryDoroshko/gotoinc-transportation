import React from "react";
import Layout from "../../components/shared/Layout/Layout.tsx";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router";
import { RouterEnum } from "../../constants/enums/routerEnum.ts";

const LINK_COLOR = "#FFFFFF";

const linkStyles = {
  color: LINK_COLOR,
  textDecoration: "none",
};

const ErrorPage: React.FC = () => {
  return (
    <Layout>
      <Container className="text-center mt-5">
        <h1 className="display-4 text-danger">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Button variant="primary">
          <Link to={RouterEnum.HOME} style={linkStyles}>Go to Home</Link></Button>
      </Container>
    </Layout>
  );
};

export default ErrorPage;