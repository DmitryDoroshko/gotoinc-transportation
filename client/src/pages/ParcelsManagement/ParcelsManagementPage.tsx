import RequestForm from "../../components/RequestForm/RequestForm.tsx";
import Layout from "../../components/shared/Layout/Layout.tsx";
import ParcelsList from "../../components/ParcelsList/ParcelsList.tsx";

const ParcelsManagementPage = () => {
  return (
    <Layout>
      <RequestForm />
      <hr />
      <ParcelsList />
    </Layout>
  );
};

export default ParcelsManagementPage;