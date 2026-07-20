import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import { ROLES } from "../features/auth/constants/roles";

import DashboardPage from "../features/dashboard/pages/DashboardPage";

import BillingPage from "../features/frontdesk/pages/BillingPage";
import PatientRequisitionForm from "../features/frontdesk/pages/PatientRequisitionForm";
import PatientRequisitionList from "../features/frontdesk/pages/PatientRequisitionList";

import CreateDonorPage from "../features/lab/pages/CreateDonorPage";
import DonorRegistrationPage from "../features/lab/pages/DonorRegistrationPage";
import LabelGenerationPage from "../features/lab/pages/LabelGenerationPage";
import LabProcessingPage from "../features/lab/pages/LabProcessingPage";

import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleGuard from "./RoleGuard";
import CompatibilityReportPage from "../features/lab/pages/CompatibilityReportPage";
import RegisterPage from "../features/auth/pages/RegisterPage";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect Root */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* ===================== Admin ===================== */}
          <Route
            element={
              <RoleGuard
                allowedRoles={[ROLES.ADMIN]}
              />
            }
          >
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />
          </Route>

          {/* ===================== Front Desk ===================== */}
          <Route
            element={
              <RoleGuard
                allowedRoles={[
                  ROLES.FRONTDESK,
                  ROLES.ADMIN,
                ]}
              />
            }
          >
            <Route
              path="/frontdesk/patient-requisition"
              element={<PatientRequisitionList />}
            />

            <Route
              path="/frontdesk/patient-requisition/create"
              element={<PatientRequisitionForm />}
            />

            <Route
              path="/billing"
              element={<BillingPage />}
            />
          </Route>

          {/* ===================== Technical ===================== */}
          <Route
            element={
              <RoleGuard
                allowedRoles={[
                  ROLES.TECHNICAL,
                  ROLES.ADMIN,
                ]}
              />
            }
          >
            <Route
              path="/donor-registration"
              element={<DonorRegistrationPage />}
            />

            <Route
              path="/donor-registration/new"
              element={<CreateDonorPage />}
            />

            <Route
              path="/lab-processing"
              element={<LabProcessingPage />}
            />

            <Route
              path="/compatibility-report"
              element={<CompatibilityReportPage />}
            />

            {/*
            <Route
              path="/compatibility-report"
              element={<CompatibilityReportPage />}
            />
            */}
          </Route>
        </Route>
      </Route>

      {/* Unauthorized */}
      <Route
        path="/unauthorized"
        element={<div>Unauthorized Access</div>}
      />

      {/* 404 */}
      <Route
        path="*"
        element={<div>404 - Page Not Found</div>}
      />
    </Routes>
  );
};

export default AppRoutes;