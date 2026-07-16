
import PageHeader from "../../../components/common/PageHeader";
import DashboardStats from "../components/DashboardStats";
import RecentActivityTable from "../components/RecentActivityTable";

const DashboardPage = () => {
  return <>
    <PageHeader title="Dashboard" subtitle="Overview of blood bank operations"/>
    <DashboardStats/>
    <RecentActivityTable/>
  </>
};

export default DashboardPage;