import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./layouts/dashboard";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard/tabelpenitip" replace />} />
    </Routes>
  );
}

export default App;
