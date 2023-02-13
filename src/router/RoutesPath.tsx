import { Routes, Route } from "react-router-dom";
import HomePage from "../home/HomePage";
import Dashboard from "../dashboard/Dashboard";
import Tree from "../tree/Tree";
function RoutesPath() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data" element={<HomePage />} />
        <Route path="/tree" element={<Tree />} />
      </Routes>
    </>
  );
}

export default RoutesPath;
