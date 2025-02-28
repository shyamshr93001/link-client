import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResetPass from "./pages/ResetPass";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Post from "./pages/Post";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App App-header">
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password" element={<ResetPass />} />
          </Routes>
        </div>

        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
