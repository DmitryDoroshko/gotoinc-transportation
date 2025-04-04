import Layout from "../../components/shared/Layout/Layout.tsx";
import { Link } from "react-router";
import { RouterEnum } from "../../constants/enums/routerEnum.ts";
import { Button } from "react-bootstrap";

const LINK_COLOR = "#FFFFFF";

const linkStyles = {
  color: LINK_COLOR,
  textDecoration: "none",
};

function AppPage() {
  return (
    <Layout>
      <h2>Welcome to Gotoinc Transportation</h2>
      <Button variant="primary">
        <Link to={RouterEnum.PARCELS_MANAGEMENT} style={linkStyles}>Go to Parcels Management</Link>
      </Button>
    </Layout>
  );
}

export default AppPage;
