import Home from "./components/Home";
import Game from "./components/Game";
import Login from "./components/Login";

import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
