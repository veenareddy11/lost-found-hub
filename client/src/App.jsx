import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostItem from "./pages/PostItem";
import ProtectedRoute from "./components/ProtectedRoute";
import MyItems from "./pages/MyItems";

import Navbar from "./components/Navbar";

function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen overflow-x-hidden bg-[#0f172a]">

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/my-items" element={<MyItems />} />

          <Route
            path="/post-item"
            element={
              <ProtectedRoute>
                <PostItem />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

    </BrowserRouter>

  );

}

export default App;