import { Routes, Route } from "react-router-dom";
import HomePage from "../home/HomePage";
import Dashboard from "../dashboard/Dashboard";
function RoutesPath() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default RoutesPath;
