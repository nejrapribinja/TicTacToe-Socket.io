import Home from "./components/Home";
import Game from "./components/Game";
import Login from "./components/Login";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}><Route path="/game" element={<Game />} /></Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
