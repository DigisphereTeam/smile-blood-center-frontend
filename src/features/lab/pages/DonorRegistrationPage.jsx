import { useNavigate } from "react-router-dom"
import AppButton from "../../../components/common/AppButton"
import PageHeader from "../../../components/common/PageHeader"
import DonorStats from "../components/donor/DonorStats"
import { useDonors } from "../api/donorApi"
import DonorTable from "../components/donor/DonorTable"
import LoadingIndicator from "../../../components/common/LoadingIndicator"

const DonorRegistrationPage = () => {
  const navigate = useNavigate()

  const {data,isLoading,isError,error} = useDonors()
  
  const donors= data?.data ?? []

  const handleCreate= () => {
    navigate('/donor-registration/new')
  }

  const handleEdit = (id) => {
    navigate(`/donor-registration/edit/${id}`)
  }

  if(isLoading){
    return <div><LoadingIndicator/></div>
  }

  if(isError){
    return(
      <div>
        {error?.response?.data?.message || "Failed to fetch donors"}
      </div>
    )
  }

  return (
    <>
     <PageHeader
        title="Donor Registration"
        subtitle="Manage registered blood donors and donated blood units"
        action={
          <AppButton onClick={handleCreate}>
            Register Donor
          </AppButton>
        }
     />
     
     <DonorStats donors={donors}/>

     <DonorTable donors={donors} onEdit={handleEdit}/>
    </>
  )
}

export default DonorRegistrationPage