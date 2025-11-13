
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Plans from "./pages/Plans.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminSubscriptions from "./pages/AdminSubscriptions.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plans" element={<PrivateRoute><Plans /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/subscriptions" element={<AdminRoute><AdminSubscriptions/></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
