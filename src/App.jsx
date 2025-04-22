// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/employeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import Unauthorized from "./pages/Unauthorized";
import { SidebarProvider } from './context/SidebarContext'; // ✅ Import provider

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/admin-dashboard" element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          } />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
