import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoworkingsPage from "./pages/admin/CoworkingsPage";
import CreateCoworkingPage from "./pages/admin/CreateCoworkingPage";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import UpdateCoworkingPage from "./pages/admin/UpdateCoworkingPage";
import DashboardPage from "./pages/admin/DashboardPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import CoworkingsPagePublic from "./pages/public/CoworkingPagePuclic";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/coworkings" element={<CoworkingsPage />} />
        <Route path="/admin/coworkings/create" element={<CreateCoworkingPage />} />
        <Route path="/admin/coworkings/:id/update" element={<UpdateCoworkingPage />} />


        <Route path="/login" element={<LoginPage />} />
        <Route path="/coworkings" element={<CoworkingsPagePublic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
