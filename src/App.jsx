import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import Profile from "./pages/Profile";
import CreateTask from "./pages/CreateTask";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { AuthProvider } from "./auth/AuthContext";

import { TaskProvider } from "./Context/TaskContext";

import ProtectedRoute from "./auth/ProtectedRoute";
import UpdateProfile from "./pages/UpdateProfile";
import Validation from "./pages/Validation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route path="/about" element={<About />}></Route>
        <Route path="/validation" element={<Validation/>}></Route>

          <Route path="/task-list" element= {<ProtectedRoute> <TaskList /> </ProtectedRoute>}></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
          <Route path="/UpdateProfile" element={ <ProtectedRoute><UpdateProfile /></ProtectedRoute>}></Route>
          <Route path="/createtask" element={ <ProtectedRoute> <CreateTask /> </ProtectedRoute>}></Route>
         
          <Route path="*" element={<PageNotFound />}></Route>
        
        </Routes>
        </TaskProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
