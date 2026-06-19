import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import JobList from "./pages/JobList";
import AddJob from "./pages/AddJob";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import JobDetails from "./pages/JobDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<JobList />} />

        <Route path="/add" element={<AddJob />} />

        <Route path="/job/:id" element={<JobDetails />} />


        <Route path="/login" element={<Login />} />

        <Route path="/contact" element={<Contact />} />

        {/* 🔐 PROTECTED ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;