import { useEffect, useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import DonorStats from "../components/donor/DonorStats";
import DonorTable from "../components/donor/DonorTable";

import { getDonors } from "../../storage/donorStorageApi";
import AppButton from "../../../components/common/AppButton";
import { useNavigate } from "react-router-dom";


const DonorRegistrationPage = () => {
  const navigate=useNavigate()
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    setDonors(getDonors());
  }, []);

  const handleCreate=()=>{
      navigate("/donor-registration/new")
  }
  return (
    <>
      <PageHeader
        title="Donor Registration"
        subtitle="Manage registered blood donors and donated blood units."
        action={
          <AppButton onClick={handleCreate}>Register Donor</AppButton>
        }
      />

      <DonorStats donors={donors} />

      <DonorTable
        donors={donors}
        setDonors={setDonors}
      />
    </>
  );
};

export default DonorRegistrationPage;