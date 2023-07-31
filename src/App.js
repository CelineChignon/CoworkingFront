import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoworkingsPage from "./pages/CoworkingsPage";
import CreateCoworkingPage from "./pages/CreateCoworkingPage";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coworkings" element={<CoworkingsPage />} />
        <Route path="/coworkings/create" element={<CreateCoworkingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
