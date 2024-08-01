import "./styles/grid.css";
import "./styles/responsive.css";
import "./styles/admin.css";
import "./styles/modal.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLoginScreen from "./admin/auth/AuthLoginScreen";
import CompanyIndexScreen from "./admin/company/CompanyIndexScreen";
import CompanyCreateScreen from "./admin/company/CompanyCreateScreen";
import CompanyEditScreen from "./admin/company/CompanyEditScreen";
import EmployeeIndexScreen from "./admin/employee/EmployeeIndexScreen";
import EmployeeCreateScreen from "./admin/employee/EmployeeCreateScreen";
import EmployeeEditScreen from "./admin/employee/EmployeeEditScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={<AuthLoginScreen />} />
          <Route path='/login' element={<AuthLoginScreen />} />

          <Route path='/admin/companies' element={<CompanyIndexScreen />} />
          <Route path='/admin/companies/create' element={<CompanyCreateScreen />} />
          <Route path='/admin/companies/:id' element={<CompanyEditScreen />} />

          <Route path='/admin/employees' element={<EmployeeIndexScreen />} />
          <Route path='/admin/employees/create' element={<EmployeeCreateScreen />} />
          <Route path='/admin/employees/:id' element={<EmployeeEditScreen />} />


        </Routes>
      </Router>
    </>

  );
}

export default App;
