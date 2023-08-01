import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoworkingsPage from "./pages/CoworkingsPage";
import CreateCoworkingPage from "./pages/CreateCoworkingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UpdateCoworkingPage from "./pages/UpdateCoworkingPage";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/coworkings" element={<CoworkingsPage />} />
        <Route path="/admin/coworkings/create" element={<CreateCoworkingPage />} />
        <Route path="/admin/coworkings/:id/update" element={<UpdateCoworkingPage />} />


        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
