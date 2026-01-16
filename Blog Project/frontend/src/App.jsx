import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Welcome from "./pages/Welcome/Welcome";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import EditBlog from "./pages/EditBlog/EditBlog";

function App() {
  const isLoggedIn = !!localStorage.getItem("token"); // simple login check

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/create" element={<CreateBlog/>}></Route>
      <Route path="/edit/:id" element={<EditBlog/>}></Route>

      <Route path="/login" element={isLoggedIn ?  <Navigate to="/home" /> : <Login />} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <Signup />} />

      <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/create" element={isLoggedIn ? <CreateBlog /> : <Navigate to="/login" />} />
      <Route path="/edit/:id" element={isLoggedIn ? <EditBlog /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
